import { CredentialsForm, ProfileForm } from "@/features/auth";

import { MutationKey } from "@/shared/model";

import s from "@/views/registration/ui/Registration.module.scss";

export const useCreateSteps = () => [
  <CredentialsForm
    key={MutationKey.Credentials}
    className={s.registration__step}
  />,
  <ProfileForm key={MutationKey.Profile} className={s.registration__step} />,
];
