import { useTranslations } from 'next-intl';
import parsePhoneNumberFromString from 'libphonenumber-js';

import { formConfig } from '@/shared/config';
import { IField } from '@/shared/model';

import { IEditUserForm } from '../interfaces/editUserForm.interface';

export const getEditUserFields = (
  tShared: ReturnType<typeof useTranslations>
): IField<IEditUserForm>[] => [
  {
    label: tShared('form.email.label'),
    name: 'email',
    options: {
      disabled: true
    },
    type: 'email'
  },
  {
    label: tShared('form.name.label'),
    name: 'name',
    options: {
      minLength: {
        message: tShared('form.name.min', {
          value: formConfig.name.min
        }),
        value: formConfig.name.min
      },
      pattern: {
        message: tShared('form.name.pattern'),
        value: formConfig.name.pattern
      },
      required: tShared('form.name.required')
    }
  },
  {
    label: tShared('form.surname.label'),
    name: 'surname',
    options: {
      minLength: {
        message: tShared('form.surname.min', {
          value: formConfig.name.min
        }),
        value: formConfig.name.min
      },
      pattern: {
        message: tShared('form.surname.pattern'),
        value: formConfig.name.pattern
      },
      required: tShared('form.surname.required')
    }
  },
  {
    label: tShared('form.phone.label'),
    name: 'phone',
    options: {
      required: tShared('form.phone.required'),
      validate: value => {
        if (!value || typeof value !== 'string' || value?.length <= 1) {
          return;
        }

        const phoneNumber = parsePhoneNumberFromString(value);

        return phoneNumber?.isValid() || tShared('form.phone.pattern');
      }
    },
    type: 'tel'
  },
  {
    label: tShared('form.city.label'),
    name: 'city',
    options: {
      minLength: {
        message: tShared('form.city.min', {
          value: formConfig.city.min
        }),
        value: formConfig.city.min
      },
      pattern: {
        message: tShared('form.city.pattern'),
        value: formConfig.city.pattern
      },
      required: tShared('form.city.required')
    }
  },
  {
    label: tShared('form.address.label'),
    name: 'address',
    options: {
      minLength: {
        message: tShared('form.address.min', {
          value: formConfig.address.min
        }),
        value: formConfig.address.min
      },
      required: tShared('form.address.required')
    }
  },
  {
    accept: '.jpg, .jpeg, .png, .webp',
    label: tShared('form.avatar.label'),
    name: 'avatar',
    options: {
      max: {
        message: tShared('form.avatar.max', {
          value: formConfig.avatar.max
        }),
        value: formConfig.avatar.max
      },
      maxLength: {
        message: tShared('form.avatar.max', {
          value: formConfig.avatar.max
        }),
        value: formConfig.avatar.max
      },
      pattern: {
        message: tShared('form.avatar.pattern', {
          accept: '.jpg, .jpeg, .png, .webp'
        }),
        value: RegExp('')
      }
    },
    placeholder: tShared('form.file.placeholder'),
    type: 'file'
  }
];
