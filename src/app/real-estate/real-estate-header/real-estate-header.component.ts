import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceRangeComponent } from '../price-range/price-range.component';
import { PropertyOption } from '../interfaces/property-option';
import { ToggleOption } from '../interfaces/toggle-option';

@Component({
  selector: 'app-real-estate-header',
  imports: [CommonModule, PriceRangeComponent],
  templateUrl: './real-estate-header.component.html',
  styleUrl: './real-estate-header.component.css'
})
export class RealEstateHeaderComponent {
  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  activeFilter: string | null = null;
  activeExtraSelect: 'floorMin' | 'floorMax' | null = null;
  filtersCount: number = 0;
  typeFilterDefaultLabel = 'סוג הנכס';
  typeFilterButtonLabel = 'סוג הנכס';
  roomsFilterDefaultLabel = 'חדרים';
  roomsFilterButtonLabel = 'חדרים';
  priceFilterLabel = 'מחיר';
  priceMinPrefixLabel = 'החל מ-';
  priceMaxPrefixLabel = 'עד-';
  priceButtonLabel = this.priceFilterLabel;
  priceHeaderLabel = 'טווח מחירים';
  priceMinPlaceholder = 'ממחיר';
  priceMaxPlaceholder = 'עד מחיר';
  priceApplyLabel = 'סינון';
  listingType = 'sale';
  listingTypeLabel = 'מכירה';
  listingTypeOptions = [
    { id: 'sale', label: 'מכירה' },
    { id: 'rent', label: 'השכרה' }
  ];
  extraAdOptions: ToggleOption[] = [
    { id: 'withImage', label: 'עם תמונה', selected: false },
    { id: 'withPrice', label: 'עם מחיר', selected: false },
    { id: 'officesOnly', label: 'רק מושבים וקיבוצים', selected: false },
    { id: 'priceDrop', label: 'נכסים שמחירם ירד', selected: false, tag: 'חדש' }
  ];
  extraPublisherOptions: ToggleOption[] = [
    { id: 'broker', label: 'תיווך', selected: false },
    { id: 'developer', label: 'יזם/קבלן', selected: false }
  ];
  extraPropertyFeatures: ToggleOption[] = [
    { id: 'parking', label: 'חניה', selected: false, icon: 'P' },
    { id: 'elevator', label: 'מעלית', selected: false, icon: 'E' },
    { id: 'mamad', label: 'ממ\"ד', selected: false, icon: 'M' },
    { id: 'storage', label: 'מחסן', selected: false, icon: 'S' },
    { id: 'ac', label: 'מיזוג', selected: false, icon: 'A' },
    { id: 'balcony', label: 'מרפסת', selected: false, icon: 'B' },
    { id: 'bars', label: 'סורגים', selected: false, icon: 'G' },
    { id: 'accessible', label: 'גישה לנכים', selected: false, icon: 'N' },
    { id: 'renovated', label: 'משופצת', selected: false, icon: 'R' },
    { id: 'furnished', label: 'מרוהטת', selected: false, icon: 'F' },
    { id: 'exclusive', label: 'בבלעדיות', selected:false, icon: ''}
  ];
  extraPropertyState: ToggleOption[] = [
    { id: 'newContractor', label: 'חדש מקבלן (לא גרו בכלל)', selected: false },
    { id: 'newUpTo10', label: 'חדש (נכס עד 10 שנים)', selected: false },
    { id: 'renovated5', label: 'משופץ (שופץ ב-5 שנים האחרונות)', selected: false },
    { id: 'goodCondition', label: 'במצב שמור (במצב טוב, לא שופץ)', selected: false },
    { id: 'needsRenovation', label: 'דרוש שיפוץ (זקוק לעבודות שיפוץ)', selected: false },
  ];
  floorLevels = Array.from({ length: 21 }, (_, index) => index);
  floorMinLimit = -1;
  floorMaxLimit = 20;
  floorStep = 1;
  floorMinValue: number | null = null;
  floorMaxValue: number | null = null;
  apartmentSizeMinLimit = 0;
  apartmentSizeMaxLimit = 500;
  apartmentSizeStep = 5;
  apartmentSizeMin = this.apartmentSizeMinLimit;
  apartmentSizeMax = this.apartmentSizeMaxLimit;
  builtAreaMinLimit = 0;
  builtAreaMaxLimit = 500;
  builtAreaStep = 5;
  builtAreaMin = this.builtAreaMinLimit;
  builtAreaMax = this.builtAreaMaxLimit;
  entryDate = '';
  entryImmediate = false;
  freeText = '';
  roomsRangeStart: number | null = null;
  roomsRangeEnd: number | null = null;
  roomsOptions = [
    { value: 1, label: '1' },
    { value: 1.5, label: '1.5' },
    { value: 2, label: '2' },
    { value: 2.5, label: '2.5' },
    { value: 3, label: '3' },
    { value: 3.5, label: '3.5' },
    { value: 4, label: '4' },
    { value: 4.5, label: '4.5' },
    { value: 5, label: '5' },
    { value: 5.5, label: '5.5' },
    { value: 6, label: '+6' },
  ];

  propertyOptions: { [key: string]: PropertyOption[] } = {
    apartments: [
      { id: 'all', label: 'הכל', value: '', selected: false },
      { id: '1', label: 'דירה', value: '1', selected: false },
      { id: '3', label: 'דירת גן', value: '3', selected: false },
      { id: '6', label: 'גג/ פנטהאוז', value: '6', selected: false },
      { id: '7', label: 'דופלקס', value: '7', selected: false },
      { id: '25', label: 'תיירות ונופש', value: '25', selected: false },
      { id: '49', label: 'מרתף/ פרטר', value: '49', selected: false },
      { id: '51', label: 'טריפלקס', value: '51', selected: false },
      { id: '11', label: 'יחידת דיור', value: '11', selected: false },
      { id: '4', label: 'סטודיו/ לופט', value: '4', selected: false },
    ],
    houses: [
      { id: 'all', label: 'הכל', value: '', selected: false },
      { id: '5', label: "בית פרטי/ קוטג'", value: '5', selected: false },
      { id: '39', label: 'דו משפחתי', value: '39', selected: false },
      { id: '32', label: 'משק חקלאי/ נחלה', value: '32', selected: false },
      { id: '55', label: 'משק עזר', value: '55', selected: false },
    ],
    others: [
      { id: 'all', label: 'הכל', value: '', selected: false },
      { id: '33', label: 'מגרשים', value: '33', selected: false },
      { id: '61', label: 'דיור מוגן', value: '61', selected: false },
      { id: '44', label: 'בניין מגורים', value: '44', selected: false },
      { id: '45', label: 'מחסן', value: '45', selected: false },
      { id: '30', label: 'חניה', value: '30', selected: false },
      { id: '50', label: "קב' רכישה/ זכות לנכס", value: '50', selected: false },
      { id: '41', label: 'כללי', value: '41', selected: false },
    ],
  };

  toggleFilter(filterName: string) {
    if (this.activeFilter === filterName) {
      this.activeFilter = null;
    } else {
      this.activeFilter = filterName;
    }

    if (this.activeFilter !== 'extraFilters') {
      this.activeExtraSelect = null;
    }
  }

  closeFilters() {
    this.activeFilter = null;
    this.activeExtraSelect = null;
  }

  get extraFiltersCount(): number {
    let count = 0;
    if (this.extraAdOptions.some(option => option.selected)) count++;
    if (this.extraPublisherOptions.some(option => option.selected)) count++;
    if (this.extraPropertyFeatures.some(option => option.selected)) count++;
    if (this.extraPropertyState.some(option => option.selected)) count++;
    if (this.floorMinValue !== null || this.floorMaxValue !== null) count++;
    if (this.apartmentSizeMin !== this.apartmentSizeMinLimit || this.apartmentSizeMax !== this.apartmentSizeMaxLimit) count++;
    if (this.builtAreaMin !== this.builtAreaMinLimit || this.builtAreaMax !== this.builtAreaMaxLimit) count++;
    if (this.entryDate || this.entryImmediate) count++;
    if (this.freeText.trim()) count++;
    return count;
  }

  get floorMinSlider(): number {
    return this.floorMinValue ?? this.floorMinLimit;
  }

  get floorMaxSlider(): number {
    return this.floorMaxValue ?? this.floorMaxLimit;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.activeFilter) return;
    if (!(event.target instanceof Element)) {
      this.activeFilter = null;
      return;
    }

    const host = this.elementRef.nativeElement;
    if (!host.contains(event.target)) {
      this.activeFilter = null;
      return;
    }

    const clickedInsideMenu = event.target.closest('.dropdown-menu, .extra-filters-modal');
    const clickedOnChip = event.target.closest('.filter-chip');
    if (!clickedInsideMenu && !clickedOnChip) {
      this.activeFilter = null;
      this.activeExtraSelect = null;
    }

    if (this.activeFilter === 'extraFilters') {
      const clickedOnSelect = event.target.closest('.range-select');
      if (!clickedOnSelect) {
        this.activeExtraSelect = null;
      }
    }
  }

  selectListingType(optionId: string) {
    this.listingType = optionId;
    const selected = this.listingTypeOptions.find(opt => opt.id === optionId);
    this.listingTypeLabel = selected ? selected.label : this.listingTypeLabel;
    this.activeFilter = null;
  }

  toggleExtraOption(option: ToggleOption) {
    option.selected = !option.selected;
  }

  get floorMinDisplayLabel(): string {
    if (this.floorMinValue === null) return 'מתוך';
    if (this.floorMinValue === -1) return 'מרתף';
    if (this.floorMinValue === 0) return 'קרקע';
    return this.floorMinValue.toString();
  }

  get floorMaxDisplayLabel(): string {
    if (this.floorMaxValue === null) return '+20';
    if (this.floorMaxValue === 0) return 'קרקע';
    if (this.floorMaxValue === this.floorMaxLimit) return '20+';
    return this.floorMaxValue.toString();
  }

  toggleExtraSelect(selectId: 'floorMin' | 'floorMax') {
    this.activeExtraSelect = this.activeExtraSelect === selectId ? null : selectId;
  }

  setFloorMinValue(value: number | null) {
    this.floorMinValue = value;
    if (this.floorMinValue !== null && this.floorMaxValue !== null && this.floorMinValue > this.floorMaxValue) {
      this.floorMaxValue = this.floorMinValue;
    }
    this.activeExtraSelect = null;
  }

  setFloorMaxValue(value: number | null) {
    this.floorMaxValue = value;
    if (this.floorMinValue !== null && this.floorMaxValue !== null && this.floorMaxValue < this.floorMinValue) {
      this.floorMinValue = this.floorMaxValue;
    }
    this.activeExtraSelect = null;
  }

  onFloorRangeChange(range: { min: number; max: number }) {
    this.floorMinValue = range.min === this.floorMinLimit ? null : range.min;
    this.floorMaxValue = range.max === this.floorMaxLimit ? null : range.max;
  }

  onApartmentSizeRangeChange(range: { min: number; max: number }) {
    this.apartmentSizeMin = range.min;
    this.apartmentSizeMax = range.max;
  }

  onBuiltAreaRangeChange(range: { min: number; max: number }) {
    this.builtAreaMin = range.min;
    this.builtAreaMax = range.max;
  }

  onEntryDateChange(event: Event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    this.entryDate = target.value;
  }

  onFreeTextInput(event: Event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    this.freeText = target.value;
  }

  resetExtraFilters() {
    this.extraAdOptions.forEach(option => (option.selected = false));
    this.extraPublisherOptions.forEach(option => (option.selected = false));
    this.extraPropertyFeatures.forEach(option => (option.selected = false));
    this.extraPropertyState.forEach(option => (option.selected = false));
    this.floorMinValue = null;
    this.floorMaxValue = null;
    this.apartmentSizeMin = this.apartmentSizeMinLimit;
    this.apartmentSizeMax = this.apartmentSizeMaxLimit;
    this.builtAreaMin = this.builtAreaMinLimit;
    this.builtAreaMax = this.builtAreaMaxLimit;
    this.entryDate = '';
    this.entryImmediate = false;
    this.freeText = '';
    this.activeExtraSelect = null;
  }

  toggleOption(groupId: string, optionId: string) {
    const options = this.propertyOptions[groupId];
    if (!options) return;

    const allOption = options.find(o => o.id === 'all');

    if (optionId === 'all') {
      const newState = allOption ? !allOption.selected : false;
      options.forEach(o => (o.selected = newState));
      this.updateFiltersSummary();
      return;
    }

    const option = options.find(o => o.id === optionId);
    if (option) {
      option.selected = !option.selected;
    }

    if (allOption) {
      const othersSelected = options
        .filter(o => o.id !== 'all')
        .every(o => o.selected);
      allOption.selected = othersSelected;
    }
    this.updateFiltersSummary();
  }

  toggleRoom(value: number) {
    if (this.roomsRangeStart !== null && this.roomsRangeEnd !== null) {
      const range = this.getRoomsRange();
      if (range && value >= range.min && value <= range.max) {
        this.roomsRangeStart = null;
        this.roomsRangeEnd = null;
        this.updateRoomsSummary();
        return;
      }
      this.roomsRangeStart = value;
      this.roomsRangeEnd = null;
      this.updateRoomsSummary();
      return;
    }

    if (this.roomsRangeStart === null) {
      this.roomsRangeStart = value;
      this.roomsRangeEnd = null;
    } else if (this.roomsRangeEnd === null) {
      if (value === this.roomsRangeStart) {
        this.roomsRangeStart = null;
      } else {
        this.roomsRangeEnd = value;
      }
    } else {
      this.roomsRangeStart = value;
      this.roomsRangeEnd = null;
    }
    this.updateRoomsSummary();
  }

  isRoomSelected(value: number): boolean {
    return value === this.roomsRangeStart || value === this.roomsRangeEnd;
  }

  isRoomInRange(value: number): boolean {
    if (this.roomsRangeStart === null || this.roomsRangeEnd === null) {
      return false;
    }
    const range = this.getRoomsRange();
    if (!range) return false;
    return value >= range.min && value <= range.max;
  }

  isRoomRangeStart(value: number): boolean {
    const range = this.getRoomsRange();
    return !!range && value === range.min;
  }

  isRoomRangeEnd(value: number): boolean {
    const range = this.getRoomsRange();
    return !!range && value === range.max;
  }

  private getRoomsRange(): { min: number; max: number } | null {
    if (this.roomsRangeStart === null) return null;
    const end = this.roomsRangeEnd ?? this.roomsRangeStart;
    return {
      min: Math.min(this.roomsRangeStart, end),
      max: Math.max(this.roomsRangeStart, end)
    };
  }

  private formatRoomValue(value: number): string {
    return value === 6 ? '+6' : value.toString();
  }

  private updateRoomsSummary() {
    if (this.roomsRangeStart === null) {
      this.roomsFilterButtonLabel = this.roomsFilterDefaultLabel;
      return;
    }

    const end = this.roomsRangeEnd ?? this.roomsRangeStart;
    const min = Math.min(this.roomsRangeStart, end);
    const max = Math.max(this.roomsRangeStart, end);

    if (min === max) {
      this.roomsFilterButtonLabel = `${this.formatRoomValue(min)} ${this.roomsFilterDefaultLabel}`;
      return;
    }

    this.roomsFilterButtonLabel = `${this.formatRoomValue(min)} - ${this.formatRoomValue(max)} ${this.roomsFilterDefaultLabel}`;
  }

  resetFilter() {
    for (const group of Object.values(this.propertyOptions)) {
      for (const option of group) {
        option.selected = false;
      }
    }
    this.roomsRangeStart = null;
    this.roomsRangeEnd = null;
    this.updateRoomsSummary();
    this.updateFiltersSummary();
  }

  private updateFiltersSummary() {
    const selectedOptions: PropertyOption[] = [];

    for (const group of Object.values(this.propertyOptions)) {
      for (const option of group) {
        if (option.id !== 'all' && option.selected) {
          selectedOptions.push(option);
        }
      }
    }

    this.filtersCount = selectedOptions.length;

    if (this.filtersCount === 0) {
      this.typeFilterButtonLabel = this.typeFilterDefaultLabel;
    } else if (this.filtersCount === 1) {
      this.typeFilterButtonLabel = selectedOptions[0].label;
    } else {
      this.typeFilterButtonLabel = `${this.typeFilterDefaultLabel} (${this.filtersCount})`;
    }
  }

}
