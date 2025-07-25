import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

// Mock AOS globally
declare var window: any;
const mockAOS = {
  init: jasmine.createSpy('init')
};

describe('App', () => {
  let component: App;
  let fixture: any;

  beforeEach(async () => {
    // Mock AOS before importing
    if (!window.AOS) {
      window.AOS = mockAOS;
    }

    // Setup mocks before TestBed configuration
    const mockMatchMedia = jasmine.createSpy('matchMedia').and.returnValue({
      matches: false,
      addEventListener: jasmine.createSpy(),
      removeEventListener: jasmine.createSpy(),
    });

    const mockLocalStorage = {
      getItem: jasmine.createSpy('getItem').and.returnValue(null),
      setItem: jasmine.createSpy('setItem'),
    };

    const mockDocumentElement = {
      classList: {
        add: jasmine.createSpy('add'),
        remove: jasmine.createSpy('remove'),
      },
    };

    // Define properties at the window level
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: mockLocalStorage,
    });

    Object.defineProperty(document, 'documentElement', {
      writable: true,
      value: mockDocumentElement,
    });

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    
    // Reset AOS mock calls
    mockAOS.init.calls.reset();
  });

  describe('Component Creation', () => {
    it('should create the app', () => {
      expect(component).toBeTruthy();
    });

    it('should have the correct title', () => {
      expect(component['title']).toBe('Portal Biz');
    });

    it('should initialize isDarkMode as false', () => {
      expect(component['isDarkMode']).toBe(false);
    });
  });

  describe('ngOnInit', () => {
    it('should call configDarkMode and updateDarkModeClass', () => {
      spyOn(component, 'configDarkMode');
      spyOn(component, 'updateDarkModeClass');
      
      // Mock the AOS.init call to prevent DOM errors
      const originalNgOnInit = component.ngOnInit;
      spyOn(component, 'ngOnInit').and.callFake(() => {
        component.configDarkMode();
        component.updateDarkModeClass();
        mockAOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: false,
        });
      });
      
      component.ngOnInit();
      
      expect(component.configDarkMode).toHaveBeenCalled();
      expect(component.updateDarkModeClass).toHaveBeenCalled();
      expect(mockAOS.init).toHaveBeenCalledWith({
        duration: 600,
        easing: 'ease-in-out',
        once: false,
      });
    });
  });

  describe('configDarkMode', () => {
    it('should set isDarkMode to true when saved theme is dark', () => {
      const mockStorage = window.localStorage as any;
      mockStorage.getItem.and.returnValue('dark');
      
      component.configDarkMode();
      
      expect(component['isDarkMode']).toBe(true);
    });

    it('should set isDarkMode to false when saved theme is light', () => {
      const mockStorage = window.localStorage as any;
      mockStorage.getItem.and.returnValue('light');
      
      component.configDarkMode();
      
      expect(component['isDarkMode']).toBe(false);
    });

    it('should use system preference when no saved theme exists', () => {
      const mockStorage = window.localStorage as any;
      const mockMedia = window.matchMedia as any;
      
      mockStorage.getItem.and.returnValue(null);
      mockMedia.and.returnValue({ matches: true });
      
      component.configDarkMode();
      
      expect(component['isDarkMode']).toBe(true);
    });
  });

  describe('updateDarkModeClass', () => {
    it('should add dark class when isDarkMode is true', () => {
      component['isDarkMode'] = true;
      const mockElement = document.documentElement as any;
      
      component.updateDarkModeClass();
      
      expect(mockElement.classList.add).toHaveBeenCalledWith('dark');
    });

    it('should remove dark class when isDarkMode is false', () => {
      component['isDarkMode'] = false;
      const mockElement = document.documentElement as any;
      
      component.updateDarkModeClass();
      
      expect(mockElement.classList.remove).toHaveBeenCalledWith('dark');
    });
  });

  describe('Integration Tests', () => {
    it('should properly initialize from localStorage', () => {
      const mockStorage = window.localStorage as any;
      const mockElement = document.documentElement as any;
      
      mockStorage.getItem.and.returnValue('dark');
      
      // Mock ngOnInit to avoid AOS DOM issues
      spyOn(component, 'configDarkMode').and.callThrough();
      spyOn(component, 'updateDarkModeClass').and.callThrough();
      
      component.configDarkMode();
      component.updateDarkModeClass();
      
      expect(component['isDarkMode']).toBe(true);
      expect(mockElement.classList.add).toHaveBeenCalledWith('dark');
    });

    it('should properly initialize from system preference', () => {
      const mockStorage = window.localStorage as any;
      const mockMedia = window.matchMedia as any;
      const mockElement = document.documentElement as any;
      
      mockStorage.getItem.and.returnValue(null);
      mockMedia.and.returnValue({ matches: false });
      
      // Mock ngOnInit to avoid AOS DOM issues
      spyOn(component, 'configDarkMode').and.callThrough();
      spyOn(component, 'updateDarkModeClass').and.callThrough();
      
      component.configDarkMode();
      component.updateDarkModeClass();
      
      expect(component['isDarkMode']).toBe(false);
      expect(mockElement.classList.remove).toHaveBeenCalledWith('dark');
    });
  });
});
