import { Component, EventEmitter, input, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-price-range',
  imports: [CommonModule],
  templateUrl: './price-range.component.html',
  styleUrl: './price-range.component.css'
})
export class PriceRangeComponent implements OnInit, OnChanges {
  @Input() minLimit = 0;
  @Input() maxLimit = 20000000;
  @Input() step = 10000;
  @Input() defaultMin = 0;
  @Input() defaultMax = 20000000;
  @Input() defaultLabel = 'מחיר';
  @Input() minPrefixLabel = 'החל מ-';
  @Input() maxPrefixLabel = 'עד-';
  @Input() valueMin: number | null = null;
  @Input() valueMax: number | null = null;
  @Input() showValues = true;
  @Input() showPrefix = true;
  @Input() valuePrefix = '₪';
  @Input() showPlusAtMax = true;
  @Input() compact = false;
  @Output() labelChange = new EventEmitter<string>();
  @Output() rangeChange = new EventEmitter<{ min: number; max: number }>();

  minValue = 0;
  maxValue = 0;
  private readonly formatter = new Intl.NumberFormat('he-IL');

  ngOnInit() {
    this.syncValues();
    this.emitChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['valueMin'] ||
      changes['valueMax'] ||
      changes['minLimit'] ||
      changes['maxLimit'] ||
      changes['defaultMin'] ||
      changes['defaultMax']
    ) {
      this.syncValues();
    }
  }

  get minPercent(): number {
    return this.getPercent(this.minValue);
  }

  get maxPercent(): number {
    return this.getPercent(this.maxValue);
  }

  onMinInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    this.minValue = this.clamp(value, this.minLimit, this.maxValue);
    this.emitChanges();
  }

  onMaxInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    this.maxValue = this.clamp(value, this.minValue, this.maxLimit);
    this.emitChanges();
  }

  formatValue(value: number): string {
    return this.formatter.format(value);
  }

  formatValueMax(value: number): string {
    const formatted = this.formatValue(value);
    if (this.showPlusAtMax && value === this.maxLimit) {
      return `${formatted}+`;
    }
    return formatted;
  }

  private emitChanges() {
    this.labelChange.emit(this.getLabel());
    this.rangeChange.emit({ min: this.minValue, max: this.maxValue });
  }

  private getLabel(): string {
    const isDefaultMin = this.minValue === this.defaultMin;
    const isDefaultMax = this.maxValue === this.defaultMax;

    if (isDefaultMin && isDefaultMax) {
      return this.defaultLabel;
    }

    if (!isDefaultMin && isDefaultMax) {
      return `${this.minPrefixLabel} ${this.formatValueWithAffixes(this.minValue, false)}`;
    }

    if (isDefaultMin && !isDefaultMax) {
      return `${this.maxPrefixLabel} ${this.formatValueWithAffixes(this.maxValue, true)}`;
    }

    return `${this.formatValueWithAffixes(this.minValue, false)} - ${this.formatValueWithAffixes(this.maxValue, true)}`;
  }

  private formatValueWithAffixes(value: number, useMaxFormat: boolean): string {
    const formatted = useMaxFormat ? this.formatValueMax(value) : this.formatValue(value);
    if (this.showPrefix && this.valuePrefix) {
      return `${this.valuePrefix} ${formatted}`;
    }
    return formatted;
  }

  private getPercent(value: number): number {
    const range = this.maxLimit - this.minLimit;
    if (range === 0) return 0;
    return ((value - this.minLimit) / range) * 100;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  private syncValues() {
    const minSource = this.valueMin ?? this.defaultMin;
    const maxSource = this.valueMax ?? this.defaultMax;
    const min = this.clamp(minSource, this.minLimit, this.maxLimit);
    const max = this.clamp(maxSource, this.minLimit, this.maxLimit);
    this.minValue = Math.min(min, max);
    this.maxValue = Math.max(min, max);
  }
}
