import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/user.module';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { PoliciesGuard } from './policies.guard';

@Module({
    imports: [UserModule],
    providers: [CaslAbilityFactory, PoliciesGuard],
    exports: [CaslAbilityFactory, PoliciesGuard]
})
export class PermisionsModule {}
