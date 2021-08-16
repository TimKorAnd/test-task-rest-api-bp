// TODO transform id to lowerCase and hash password
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { createHash } from 'crypto';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class TransformEmailToLowerCaseAndHashPasswordPipe implements PipeTransform<SignupDto, SignupDto> {
  transform(value: SignupDto, metadata: ArgumentMetadata): SignupDto {
    const id = value.id.toLocaleLowerCase();
    const passwordHash = createHash("sha256")
    .update(value.password)
    .digest("hex");
    
    return {id, password: passwordHash};
  }
}