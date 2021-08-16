import { IsAlphanumeric, IsEmail, IsLowercase, IsOptional, IsPhoneNumber, Length, Matches, ValidateIf } from "class-validator";

export class SignupDto {

    @Matches(''
        + /(^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/.source // email
        + /|(^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$)/.source // phone
        , '', {
        message: '$property must be an email or phone in format: ',
    }) // TODO create custom validation class. 
    // TODO how check phone when signin - pure numbers & pass hash
    id: string;

    @IsAlphanumeric()
    @Length(6, 32)
    password: string;
}