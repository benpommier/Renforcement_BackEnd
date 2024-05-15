export interface PasswordHasherServiceInterface {
    passwordHasher(password: string): Promise<string>;
}