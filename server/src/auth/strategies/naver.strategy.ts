import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(config: ConfigService) {
    super({
      clientID: config.getOrThrow('NAVER_CLIENT_ID'),
      clientSecret: config.getOrThrow('NAVER_CLIENT_SECRET'),
      callbackURL: `${config.getOrThrow('CALLBACK_BASE_URL')}/api/auth/naver/callback`,
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: Function,
  ) {
    const { id, emails, displayName, _json } = profile;
    const res = _json?.response ?? {};
    const email = emails?.[0]?.value || res?.email || null;
    const name = displayName || res?.name || res?.nickname || `네이버사용자_${id}`;
    done(null, {
      provider: 'naver',
      providerId: String(id),
      name,
      email,
    });
  }
}
