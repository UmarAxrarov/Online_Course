import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { JwtService, TokenExpiredError, JsonWebTokenError } from "@nestjs/jwt";

export interface JwtPayload { id: number; role: string }

@Injectable()
export class JwtHelper {
  constructor(private readonly jwt: JwtService) { }

  signTokens(payload: JwtPayload) {
    return {
      accessToken: this.jwt.sign(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: parseInt(process.env.ACCESS_TOKEN_TIME as string),
      }),
      refreshToken: this.jwt.sign(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: parseInt(process.env.REFRESH_TOKEN_TIME as string),
      }),
    };
  }

  verifyTokens(payload: { accessToken: string; refreshToken: string }): any {
    try {
      const accessToken = this.jwt.verify<JwtPayload>(payload.accessToken, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      const refreshToken = this.jwt.verify<JwtPayload>(payload.refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });

      // console.log("✅ access token valid:", accessToken);
      // console.log("✅ refresh token valid:", refreshToken);

      return {
        id: accessToken.id,
        role: accessToken.role,
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        try {
          const refreshPayload = this.jwt.verify<JwtPayload>(payload.refreshToken, {
            secret: process.env.REFRESH_TOKEN_SECRET,
          });

          const newAccessToken = this.jwt.sign(
            { id: refreshPayload.id, role: refreshPayload.role },
            {
              secret: process.env.ACCESS_TOKEN_SECRET,
              expiresIn: process.env.ACCESS_TOKEN_TIME,
            }
          );
          const newRefreshToken = this.jwt.sign(
            { id: refreshPayload.id, role: refreshPayload.role },
            {
              secret: process.env.REFRESH_TOKEN_SECRET,
              expiresIn: process.env.REFRESH_TOKEN_TIME,
            }
          );

          const decodedAccess = this.jwt.verify<JwtPayload>(newAccessToken, {
            secret: process.env.ACCESS_TOKEN_SECRET,
          });

          return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            id: decodedAccess.id,
            role: decodedAccess.role,
          };
        } catch (refreshError) {
          if (refreshError instanceof TokenExpiredError) {
            throw new ForbiddenException("Refresh token muddati tugagan");
          } else if (refreshError instanceof JsonWebTokenError) {
            throw new BadRequestException("Refresh token noto‘g‘ri");
          }
          throw new InternalServerErrorException("Refresh token tekshiruvda xatolik");
        }
      } else if (error instanceof JsonWebTokenError) {
        throw new BadRequestException("Access token noto‘g‘ri");
      }

      throw new InternalServerErrorException("Access token tekshiruvda xatolik");
    }
  }

}