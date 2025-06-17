import { VerifyFunction } from 'passport-google-oauth20';
declare const GoogleStrategy_base: new (...args: any) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyFunction): Promise<any>;
}
export {};
