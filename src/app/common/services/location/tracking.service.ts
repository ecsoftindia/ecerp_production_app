import { Injectable } from '@angular/core';
import { LocationService } from './location.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import type { LocationResult } from 'foreground-location';
import { ApiService } from '../../config/api.service';

export interface TrackingState {
  isTracking: boolean;
  trackingStartTime?: Date;
  totalPoints: number;
  lastLocation?: LocationResult;
}

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private readonly STORAGE_KEY = 'location_tracking_data';
  private trackingStateSubject = new BehaviorSubject<TrackingState>({
    isTracking: false,
    totalPoints: 0
  });
  private locationSubscription?: Subscription;

  public trackingState$: Observable<TrackingState> = this.trackingStateSubject.asObservable();

  constructor(
    private locationService: LocationService,
    private apiService: ApiService
  ) {
    // Initialize with stored state and check service status
    this.initializeTrackingState().catch(error => {
      console.error('Error during initialization:', error);
    });
  }

  /**
   * Start location tracking
   */
  async startTracking(): Promise<void> {
    try {
      console.log('Starting location tracking service...');

      // Check and request permissions
      const permissions = await this.locationService.checkPermissions();
      if (permissions.location !== 'granted') {
        const requestResult = await this.locationService.requestPermissions();
        if (requestResult.location !== 'granted') {
          throw new Error('Location permission is required to start tracking');
        }
      }

      // Start the location service
      await this.locationService.startLocationTracking({
        interval: 10000, // Update every 10 seconds for better tracking
        fastestInterval: 5000, // Fastest update every 5 seconds
        priority: 'HIGH_ACCURACY',
        notification: {
          title: 'You have Checked In',
          text: 'Recording your route...',
          // icon: 'ic_location'
        },
        enableHighAccuracy: true,
        distanceFilter: 5 // Update if moved 5+ meters
      });

      // Note: Location updates are handled internally by LocationService
      // Subscribe to location updates
      this.locationSubscription = this.locationService.locationUpdate$.subscribe(
        (location: LocationResult) => {
          this.handleLocationUpdate(location);
        }
      );

      // Update tracking state
      const newState: TrackingState = {
        isTracking: true,
        trackingStartTime: new Date(),
        totalPoints: this.getStoredLocations().length
      };

      this.trackingStateSubject.next(newState);
      this.saveTrackingState(newState);

      console.log('Location tracking started successfully');
    } catch (error) {
      console.error('Failed to start location tracking:', error);
      throw error;
    }
  }

  /**
   * Stop location tracking
   */
  async stopTracking(): Promise<void> {
    try {
      console.log('Stopping location tracking service...');

      await this.locationService.stopLocationTracking();

      // Unsubscribe from location updates
      if (this.locationSubscription) {
        this.locationSubscription.unsubscribe();
        this.locationSubscription = undefined;
      }

      const newState: TrackingState = {
        isTracking: false,
        totalPoints: this.getStoredLocations().length
      };

      this.trackingStateSubject.next(newState);
      this.saveTrackingState(newState);

      console.log('Location tracking stopped successfully');
    } catch (error) {
      console.error('Failed to stop location tracking:', error);
      throw error;
    }
  }

  /**
   * Get current tracking state
   */
  getCurrentTrackingState(): TrackingState {
    return this.trackingStateSubject.value;
  }

  /**
   * Get all stored location points
   */
  getStoredLocations(): LocationResult[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading stored locations:', error);
      return [];
    }
  }

  /**
   * Clear all stored location data
   */
  clearStoredData(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(`${this.STORAGE_KEY}_state`);

      const newState: TrackingState = {
        ...this.trackingStateSubject.value,
        totalPoints: 0
      };

      this.trackingStateSubject.next(newState);
      console.log('All tracking data cleared');
    } catch (error) {
      console.error('Error clearing stored data:', error);
    }
  }

  /**
   * Get tracking statistics
   */
  getTrackingStats() {
    const locations = this.getStoredLocations();
    const state = this.getCurrentTrackingState();

    return {
      totalPoints: locations.length,
      isTracking: state.isTracking,
      startTime: state.trackingStartTime,
      duration: state.trackingStartTime ?
        Date.now() - state.trackingStartTime.getTime() : 0,
      lastLocation: state.lastLocation
    };
  }

  /**
   * Handle incoming location updates
   */
  private handleLocationUpdate(location: LocationResult): void {
    console.log('📍 New location received:', location)
    // console.log('📍 New location received:', {
    //   latitude: location.latitude,
    //   longitude: location.longitude,
    //   accuracy: location.accuracy,
    //   timestamp: new Date(location.timestamp).toLocaleString()
    // });

    // Store location in localStorage
    this.storeLocation(location);

    // Update tracking state
    const currentState = this.trackingStateSubject.value;
    const newState: TrackingState = {
      ...currentState,
      lastLocation: location,
      totalPoints: this.getStoredLocations().length
    };

    this.trackingStateSubject.next(newState);
    this.saveTrackingState(newState);
  }

  /**
   * Store a single location point
   */
  private storeLocation(location: LocationResult): void {
    try {
      const existingLocations = this.getStoredLocations();
      existingLocations.push(location);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingLocations));
    } catch (error) {
      console.error('Error storing location:', error);
    }
  }

  /**
   * Initialize tracking state from storage and check service status
   */
  private async initializeTrackingState(): Promise<void> {
    try {
      const storedState = localStorage.getItem(`${this.STORAGE_KEY}_state`);
      const locations = this.getStoredLocations();

      let initialState: TrackingState = {
        isTracking: false,
        totalPoints: locations.length
      };

      if (storedState) {
        const parsed = JSON.parse(storedState);
        initialState = {
          ...parsed,
          totalPoints: locations.length
        };
      }

      // Check if service is actually running
      const serviceStatus = await this.locationService.isServiceRunning();
      console.log('Service running status on init:', serviceStatus);

      if (serviceStatus) {
        // Service is running - resume tracking state
        initialState.isTracking = true;

        // Re-establish location listener
        this.locationSubscription = this.locationService.locationUpdate$.subscribe(
          (location: LocationResult) => {
            this.handleLocationUpdate(location);
          }
        );

        console.log('Resumed tracking - service was already running');
      } else {
        // Service is not running - ensure tracking state is false
        initialState.isTracking = false;
        console.log('Service not running - tracking stopped');
      }

      this.trackingStateSubject.next(initialState);
      this.saveTrackingState(initialState);

    } catch (error) {
      console.error('Error initializing tracking state:', error);
      // Fallback to default state
      const fallbackState: TrackingState = {
        isTracking: false,
        totalPoints: this.getStoredLocations().length
      };
      this.trackingStateSubject.next(fallbackState);
    }
  }

  /**
   * Save tracking state to storage
   */
  private saveTrackingState(state: TrackingState): void {
    try {
      localStorage.setItem(`${this.STORAGE_KEY}_state`, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving tracking state:', error);
    }
  }

  /**
   * Check if service is running and resume tracking if needed
   * This should be called when the app becomes active
   */
  async checkAndResumeTracking(): Promise<void> {
    try {
      const serviceStatus = await this.locationService.isServiceRunning();
      const currentState = this.trackingStateSubject.value;

      if (serviceStatus && !currentState.isTracking) {
        console.log('Service is running but app thinks tracking is stopped - resuming');

        // Re-establish location listener
        this.locationSubscription = this.locationService.locationUpdate$.subscribe(
          (location: LocationResult) => {
            this.handleLocationUpdate(location);
          }
        );

        // Update state to reflect running service
        const updatedState: TrackingState = {
          ...currentState,
          isTracking: true
        };

        this.trackingStateSubject.next(updatedState);
        this.saveTrackingState(updatedState);

      } else if (!serviceStatus && currentState.isTracking) {
        console.log('App thinks tracking is active but service is stopped - updating state');

        // Service stopped but app thinks it's running - update state
        const updatedState: TrackingState = {
          ...currentState,
          isTracking: false
        };

        this.trackingStateSubject.next(updatedState);
        this.saveTrackingState(updatedState);
      }

    } catch (error) {
      console.error('Error checking and resuming tracking:', error);
    }
  }

  /**
   * Get detailed service status information
   */
  async getServiceStatus(): Promise<{
    isServiceRunning: boolean;
    isAppTracking: boolean;
    needsResume: boolean;
    totalPoints: number;
  }> {
    try {
      const serviceRunning = await this.locationService.isServiceRunning();
      const currentState = this.trackingStateSubject.value;

      return {
        isServiceRunning: serviceRunning,
        isAppTracking: currentState.isTracking,
        needsResume: serviceRunning && !currentState.isTracking,
        totalPoints: currentState.totalPoints
      };
    } catch (error) {
      console.error('Error getting service status:', error);
      const currentState = this.trackingStateSubject.value;
      return {
        isServiceRunning: false,
        isAppTracking: currentState.isTracking,
        needsResume: false,
        totalPoints: currentState.totalPoints
      };
    }
  }

  async bulkLocLog() {
    const obj = {
      "locationData": [
        {
          "latitude": 0,
          "longitude": 0,
          "accuracy": '',
          "timestamp": '',
          "altitude": '',
          "addressinfo": ""
        }
      ]
    }
    let coordinates: any;
    coordinates = await this.locationService.getCurrentLocation();

    if (!coordinates) {
      return
    }

    obj.locationData[0].latitude = coordinates.latitude;
    obj.locationData[0].longitude = coordinates.longitude;
    obj.locationData[0].timestamp = new Date().toISOString();
    this.apiService.bulkUpdLocationLogs(obj).subscribe((response: any) => {
      if (response.Status) {
      } else {
      }
    });
  }

  /**
   * Start tracking with API integration (example)
   */
  async startTrackingWithAPI(apiEndpoint: string, authToken?: string): Promise<void> {
    try {
      console.log('Starting location tracking with API integration...');

      // Check and request permissions
      const permissions = await this.locationService.checkPermissions();
      if (permissions.location !== 'granted') {
        const requestResult = await this.locationService.requestPermissions();
        if (requestResult.location !== 'granted') {
          throw new Error('Location permission is required to start tracking');
        }
      }

      // Start the location service with API configuration
      await this.locationService.startLocationTracking({
        interval: 60000, // Update every 30 seconds
        fastestInterval: 60000, // Fastest update every 15 seconds
        priority: 'HIGH_ACCURACY',
        notification: {
          // title: 'Location Tracking with API',
          // text: 'Sending location data to server...',
          title: 'You have Checked In',
          text: 'Recording your route...',
          // icon: 'ic_location'
        },
        enableHighAccuracy: true,
        distanceFilter: 100,
        api: {
          url: apiEndpoint,
          type: 'POST',
          header: authToken ? {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          } : {
            'Content-Type': 'application/json'
          },
          additionalParams: {
            // deviceId: this.getDeviceId(),
            // trackingSession: new Date().toISOString()
          },
          apiInterval: 5 // Send data every 5 minutes
        }
      });

      // Subscribe to location updates
      this.locationSubscription = this.locationService.locationUpdate$.subscribe(
        (location: LocationResult) => {
          this.handleLocationUpdate(location);
        }
      );

      // Update tracking state
      const newState: TrackingState = {
        isTracking: true,
        trackingStartTime: new Date(),
        totalPoints: this.getStoredLocations().length
      };

      this.trackingStateSubject.next(newState);
      this.saveTrackingState(newState);

      console.log('Location tracking with API started successfully');
    } catch (error) {
      console.error('Failed to start API tracking:', error);
      throw error;
    }
  }

  /**
   * Get API service status
   */
  async getApiServiceStatus(): Promise<any> {
    try {
      return await this.locationService.getApiServiceStatus();
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
      await this.locationService.clearApiBuffers();
      console.log('API buffers cleared');
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
      await this.locationService.resetApiCircuitBreaker();
      console.log('API circuit breaker reset');
    } catch (error) {
      console.error('Failed to reset API circuit breaker:', error);
      throw error;
    }
  }

  private getDeviceId(): string {
    // Simple device ID generation
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = 'device-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  }
}
