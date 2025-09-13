import { Injectable } from '@angular/core';
import { ForeGroundLocation } from 'foreground-location';
import { Subject } from 'rxjs';
import type {
  LocationResult,
  LocationServiceOptions,
  PluginListenerHandle,
  LocationPermissionStatus,
  ServiceStatus
} from 'foreground-location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationListener?: PluginListenerHandle;
  private statusListener?: PluginListenerHandle;
  private isTracking = false;
  private currentLocation: LocationResult | null = null;
  private locationUpdateSubject = new Subject<LocationResult>();

  // Observable for external components to subscribe to location updates
  public locationUpdate$ = this.locationUpdateSubject.asObservable();

  constructor() {
    console.log('LocationService initialized');
  }

  /**
   * Check current permission status for location, background location, and notifications
   */
  async checkPermissions(): Promise<LocationPermissionStatus> {
    try {
      const permissions = await ForeGroundLocation.checkPermissions();
      console.log('Current permissions:', permissions);
      return permissions;
    } catch (error) {
      console.error('Error checking permissions:', error);
      throw error;
    }
  }

  /**
   * Request all required permissions from the user
   */
  async requestPermissions(): Promise<LocationPermissionStatus> {
    try {
      const permissions = await ForeGroundLocation.requestPermissions();
      console.log('Permissions after request:', permissions);
      return permissions;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      throw error;
    }
  }

  /**
   * Start the foreground location tracking service
   */
  async startLocationTracking(customOptions?: Partial<LocationServiceOptions>): Promise<void> {
    try {
      // Check permissions first
      const permissions = await this.checkPermissions();

      if (permissions.location !== 'granted') {
        console.log('Location permission not granted, requesting...');
        const requestResult = await this.requestPermissions();

        if (requestResult.location !== 'granted') {
          throw new Error('Location permission denied. Cannot start location tracking.');
        }
      }

      // Create valid options with all required fields
      const options = this.createValidLocationOptions(customOptions);

      // Validate options before starting service
      this.validateLocationOptions(options);

      console.log('Starting location service with options:', options);

      // Set up listeners before starting service
      this.locationListener = await ForeGroundLocation.addListener(
        'locationUpdate',
        this.handleLocationUpdate.bind(this)
      );

      this.statusListener = await ForeGroundLocation.addListener(
        'serviceStatusChanged',
        this.handleStatusChange.bind(this)
      );

      // Start the foreground service with updated method name
      await ForeGroundLocation.startForegroundLocationService(options);

      this.isTracking = true;
      console.log('Location tracking started successfully');

    } catch (error) {
      console.error('Failed to start location tracking:', error);

      // Clean up listeners if service failed to start
      this.locationListener?.remove();
      this.statusListener?.remove();
      this.locationListener = undefined;
      this.statusListener = undefined;

      throw error;
    }
  }

  /**
   * Stop the foreground location tracking service
   */
  async stopLocationTracking(): Promise<void> {
    try {
      await ForeGroundLocation.stopForegroundLocationService();

      // Remove listeners
      this.locationListener?.remove();
      this.statusListener?.remove();

      this.locationListener = undefined;
      this.statusListener = undefined;
      this.isTracking = false;

      console.log('Location tracking stopped successfully');

    } catch (error) {
      console.error('Failed to stop location tracking:', error);
      throw error;
    }
  }

  /**
   * Get current location once without starting the service
   */
  async getCurrentLocation(): Promise<LocationResult> {
    try {
      const location = await ForeGroundLocation.getCurrentLocation();
      console.log('Current location retrieved:', location);
      this.currentLocation = location;
      return location;
    } catch (error) {
      console.error('Failed to get current location:', error);
      throw error;
    }
  }

  /**
   * Check if the location service is currently running
   */
  async isServiceRunning(): Promise<boolean> {
    try {
      const status = await ForeGroundLocation.isServiceRunning();
      console.log('Service running status:', status.isRunning);
      return status.isRunning;
    } catch (error) {
      console.error('Failed to check service status:', error);
      return false;
    }
  }

  /**
   * Update the configuration of the running location service
   */
  async updateLocationSettings(options: Partial<LocationServiceOptions>): Promise<void> {
    try {
      // Create valid options with all required fields
      const updateConfig = this.createValidLocationOptions(options);

      // Validate options before updating service
      this.validateLocationOptions(updateConfig);

      await ForeGroundLocation.updateLocationSettings(updateConfig);
      console.log('Location settings updated:', updateConfig);
    } catch (error) {
      console.error('Failed to update location settings:', error);
      throw error;
    }
  }

  /**
   * Creates a valid LocationServiceOptions object with all required fields
   * This ensures the notification configuration is always present as required by the plugin
   */
  private createValidLocationOptions(customOptions?: Partial<LocationServiceOptions>): LocationServiceOptions {
    const defaultOptions: LocationServiceOptions = {
      interval: 60000, // 1 minute
      fastestInterval: 30000, // 30 seconds
      priority: 'HIGH_ACCURACY',
      notification: {
        title: 'Location Tracking Active',
        text: 'Tracking your location for better service',
        icon: 'ic_location_on'
      },
      enableHighAccuracy: true,
      distanceFilter: 10
    };

    // Merge custom options with defaults, ensuring notification is always complete
    const mergedOptions = {
      ...defaultOptions,
      ...customOptions,
      // Notification is required by the plugin - merge with defaults to ensure it's always complete
      notification: {
        ...defaultOptions.notification,
        ...customOptions?.notification
      }
    };

    // Validate the merged options
    this.validateLocationOptions(mergedOptions);

    return mergedOptions;
  }

  /**
   * Validates that the LocationServiceOptions contain all required fields
   */
  private validateLocationOptions(options: LocationServiceOptions): void {
    if (!options.notification) {
      throw new Error('Notification configuration is required for foreground location service');
    }

    if (!options.notification.title || !options.notification.text) {
      throw new Error('Notification title and text are required');
    }
  }

  /**
   * Helper method to create a partial options object with custom notification
   * This ensures consumers always provide a valid notification configuration
   */
  createCustomOptions(
    notificationTitle: string,
    notificationText: string,
    notificationIcon?: string,
    otherOptions?: Omit<Partial<LocationServiceOptions>, 'notification'>
  ): Partial<LocationServiceOptions> {
    return {
      ...otherOptions,
      notification: {
        title: notificationTitle,
        text: notificationText,
        icon: notificationIcon || 'ic_location_on'
      }
    };
  }

  /**
   * Enhanced location update handler with additional processing
   */
  private handleLocationUpdate(location: LocationResult): void {
    console.log('📍 New location received:', {
      latitude: location.latitude,
      longitude: location.longitude,
      accuracy: location.accuracy,
      altitude: location.altitude,
      bearing: location.bearing,
      speed: location.speed,
      timestamp: new Date(location.timestamp).toLocaleString()
    });

    this.currentLocation = location;

    // Emit location update for external subscribers
    this.locationUpdateSubject.next(location);

    // Additional processing based on example
    this.processLocationUpdate(location);
  }

  /**
   * Handle service status changes
   */
  private handleStatusChange(status: ServiceStatus): void {
    console.log('Service status changed:', status);

    if (status.error) {
      console.error('Service error:', status.error);
      this.handleServiceError(status.error);
    }

    // Update internal tracking state
    this.isTracking = status.isRunning;
  }

  /**
   * Handle service errors with specific error type handling
   */
  private handleServiceError(error: string): void {
    console.error('Service error occurred:', error);

    // Handle specific error types based on the example
    if (error.includes('permission')) {
      console.log('Permission issue detected - may need to guide user to settings');
      // Could emit an event or call a callback for UI to handle
    } else if (error.includes('location')) {
      console.log('Location unavailable - may need to enable location services');
      // Could emit an event or call a callback for UI to handle
    } else {
      console.log('Unknown service error:', error);
    }
  }

  /**
   * Process location update for various use cases
   */
  private processLocationUpdate(location: LocationResult): void {
    // This method can be extended for:
    // - Updating UI components
    // - Sending to server
    // - Storing locally
    // - Triggering location-based events

    console.log('Processing location update...');

    // Example: You can emit events here for UI components to subscribe
    // this.locationSubject.next(location);

    // Example: Store in local storage for offline access
    // this.storeLocationLocally(location);

    // Example: Send to server if online
    // this.sendLocationToServer(location);
  }

  /**
   * Enhanced method to get detailed service status
   */
  async getDetailedServiceStatus(): Promise<{ isRunning: boolean; isTracking: boolean }> {
    try {
      const serviceRunning = await this.isServiceRunning();
      return {
        isRunning: serviceRunning,
        isTracking: this.isTracking
      };
    } catch (error) {
      console.error('Failed to get detailed service status:', error);
      return {
        isRunning: false,
        isTracking: this.isTracking
      };
    }
  }

  /**
   * Get API service status (if API integration is enabled)
   */
  async getApiServiceStatus(): Promise<any> {
    try {
      const status = await ForeGroundLocation.getApiServiceStatus();
      console.log('API service status:', status);
      return status;
    } catch (error) {
      console.error('Failed to get API service status:', error);
      return {
        isEnabled: false,
        bufferSize: 0,
        isHealthy: true
      };
    }
  }

  /**
   * Clear API buffers
   */
  async clearApiBuffers(): Promise<void> {
    try {
      await ForeGroundLocation.clearApiBuffers();
      console.log('API buffers cleared successfully');
    } catch (error) {
      console.error('Failed to clear API buffers:', error);
      throw error;
    }
  }

  /**
   * Reset API circuit breaker
   */
  async resetApiCircuitBreaker(): Promise<void> {
    try {
      await ForeGroundLocation.resetApiCircuitBreaker();
      console.log('API circuit breaker reset successfully');
    } catch (error) {
      console.error('Failed to reset API circuit breaker:', error);
      throw error;
    }
  }

  /**
   * Utility method to calculate distance between two locations
   */
  calculateDistance(loc1: LocationResult, loc2: LocationResult): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = loc1.latitude * Math.PI / 180;
    const φ2 = loc2.latitude * Math.PI / 180;
    const Δφ = (loc2.latitude - loc1.latitude) * Math.PI / 180;
    const Δλ = (loc2.longitude - loc1.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  /**
   * Check if location is significantly different from last known location
   */
  isLocationSignificantlyDifferent(newLocation: LocationResult, threshold: number = 10): boolean {
    if (!this.currentLocation) return true;

    const distance = this.calculateDistance(this.currentLocation, newLocation);
    return distance >= threshold;
  }

  /**
   * Get the current tracking status
   */
  getTrackingStatus(): boolean {
    return this.isTracking;
  }

  /**
   * Get the last known location
   */
  getLastKnownLocation(): LocationResult | null {
    return this.currentLocation;
  }

  /**
   * Utility method to format location for display
   */
  formatLocation(location: LocationResult): string {
    return `Lat: ${location.latitude.toFixed(6)}, Lng: ${location.longitude.toFixed(6)}, Accuracy: ${location.accuracy}m`;
  }

  /**
   * Check if all required permissions are granted
   */
  async areAllPermissionsGranted(): Promise<boolean> {
    try {
      const permissions = await this.checkPermissions();
      return permissions.location === 'granted' &&
        permissions.notifications === 'granted';
    } catch (error) {
      console.error('Error checking all permissions:', error);
      return false;
    }
  }

  /**
   * Clean up resources when service is destroyed
   */
  ngOnDestroy(): void {
    this.stopLocationTracking().catch(error => {
      console.error('Error during service cleanup:', error);
    });
  }
}
