import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/user.module';
import { CaslAbilityFactory } from './casl/casl-ability.factory';

@Module({
    imports: [UserModule],
    providers: [CaslAbilityFactory],
    exports: [CaslAbilityFactory]
})
export class PermisionsModule {}
