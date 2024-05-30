import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISponsor, NewSponsor } from '../sponsor.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISponsor for edit and NewSponsorFormGroupInput for create.
 */
type SponsorFormGroupInput = ISponsor | PartialWithRequiredKeyOf<NewSponsor>;

type SponsorFormDefaults = Pick<NewSponsor, 'id' | 'tournaments'>;

type SponsorFormGroupContent = {
  id: FormControl<ISponsor['id'] | NewSponsor['id']>;
  sponsorName: FormControl<ISponsor['sponsorName']>;
  description: FormControl<ISponsor['description']>;
  tournaments: FormControl<ISponsor['tournaments']>;
};

export type SponsorFormGroup = FormGroup<SponsorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SponsorFormService {
  createSponsorFormGroup(sponsor: SponsorFormGroupInput = { id: null }): SponsorFormGroup {
    const sponsorRawValue = {
      ...this.getFormDefaults(),
      ...sponsor,
    };
    return new FormGroup<SponsorFormGroupContent>({
      id: new FormControl(
        { value: sponsorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      sponsorName: new FormControl(sponsorRawValue.sponsorName, {
        validators: [Validators.required],
      }),
      description: new FormControl(sponsorRawValue.description),
      tournaments: new FormControl(sponsorRawValue.tournaments ?? []),
    });
  }

  getSponsor(form: SponsorFormGroup): ISponsor | NewSponsor {
    return form.getRawValue() as ISponsor | NewSponsor;
  }

  resetForm(form: SponsorFormGroup, sponsor: SponsorFormGroupInput): void {
    const sponsorRawValue = { ...this.getFormDefaults(), ...sponsor };
    form.reset(
      {
        ...sponsorRawValue,
        id: { value: sponsorRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SponsorFormDefaults {
    return {
      id: null,
      tournaments: [],
    };
  }
}
