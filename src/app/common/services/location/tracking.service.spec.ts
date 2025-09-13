import { TestBed } from '@angular/core/testing';
import { TrackingService } from './tracking.service';
import { LocationService } from './location.service';

describe('TrackingService', () => {
  let service: TrackingService;
  let locationServiceSpy: jasmine.SpyObj<LocationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LocationService', [
      'checkPermissions',
      'requestPermissions',
      'startLocationTracking',
      'stopLocationTracking'
    ]);

    TestBed.configureTestingModule({
      providers: [
        TrackingService,
        { provide: LocationService, useValue: spy }
      ]
    });

    service = TestBed.inject(TrackingService);
    locationServiceSpy = TestBed.inject(LocationService) as jasmine.SpyObj<LocationService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial tracking state as false', () => {
    const state = service.getCurrentTrackingState();
    expect(state.isTracking).toBeFalse();
    expect(state.totalPoints).toBe(0);
  });

  it('should get stored locations from localStorage', () => {
    const mockLocations = [
      {
        latitude: 37.7749,
        longitude: -122.4194,
        accuracy: 10,
        timestamp: new Date().toISOString()
      }
    ];

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockLocations));

    const locations = service.getStoredLocations();
    expect(locations.length).toBe(1);
    expect(locations[0].latitude).toBe(mockLocations[0].latitude);
    expect(locations[0].longitude).toBe(mockLocations[0].longitude);
  });

  it('should clear stored data', () => {
    spyOn(localStorage, 'removeItem');

    service.clearStoredData();

    expect(localStorage.removeItem).toHaveBeenCalledWith('location_tracking_data');
    expect(localStorage.removeItem).toHaveBeenCalledWith('location_tracking_data_state');
  });
});
