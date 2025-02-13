import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './jwt.strategy';
import { createId } from '@paralleldrive/cuid2';
import { LogUserDto } from './dto/log-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Login a user
   * Validates the email and password, returns an access token
   */
  async login({ authBody }: { authBody: LogUserDto }) {
    const { email, password } = authBody;

    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new HttpException('Utilisateur non trouvé.', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await this.isPasswordValid({
      password,
      hashedPassword: existingUser.password,
    });

    if (!isPasswordValid) {
      throw new HttpException(
        'Mot de passe invalide.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.authenticateUser({ userId: existingUser.id });
  }

  /**
   * Register a new user
   * Checks if the email exists, hashes the password and stores the new user
   */
  async register({ registerBody }: { registerBody: CreateUserDto }) {
    const { email, firstname, password } = registerBody;

    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException('Email déjà utilisé.', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.hashPwd({ password });

    const createdUser = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        firstname,
      },
    });

    return this.authenticateUser({ userId: createdUser.id });
  }

  /**
   * Hash the user's password
   */
  private async hashPwd({ password }: { password: string }) {
    return hash(password, 10);
  }

  /**
   * Check if the provided password matches the stored hashed password
   */
  private async isPasswordValid({
    password,
    hashedPassword,
  }: {
    password: string;
    hashedPassword: string;
  }) {
    return compare(password, hashedPassword);
  }

  /**
   * Request for password reset token
   * Ensures that the user exists and handles duplicate requests
   */
  async resetUserPasswordRequest({ email }: { email: string }) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new HttpException(
        "L'utilisateur n'existe pas.",
        HttpStatus.NOT_FOUND,
      );
    }

    if (existingUser.isResettingPassword) {
      throw new HttpException(
        'Une demande de réinitialisation de mot de passe est déjà en cours.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resetPasswordToken = createId();
    await this.prismaService.user.update({
      where: { email },
      data: {
        isResettingPassword: true,
        resetPasswordToken,
      },
    });

    return {
      error: false,
      message: 'Consultez votre email pour réinitialiser votre mot de passe.',
    };
  }

  /**
   * Verify the reset password token
   */
  async verifyResetPasswordToken({ token }: { token: string }) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { resetPasswordToken: token },
    });

    if (!existingUser) {
      throw new HttpException('Utilisateur non trouvé.', HttpStatus.NOT_FOUND);
    }

    if (!existingUser.isResettingPassword) {
      throw new HttpException(
        "Aucune demande de réinitialisation de mot de passe n'est en cours.",
        HttpStatus.BAD_REQUEST,
      );
    }

    return { error: false, message: 'Token valide.' };
  }

  /**
   * Reset the user's password using the provided token
   */
  async resetUserPassword({
    resetPasswordDto,
  }: {
    resetPasswordDto: ResetUserPasswordDto;
  }) {
    const { password, token } = resetPasswordDto;

    const existingUser = await this.prismaService.user.findUnique({
      where: { resetPasswordToken: token },
    });

    if (!existingUser) {
      throw new HttpException('Utilisateur non trouvé.', HttpStatus.NOT_FOUND);
    }

    if (!existingUser.isResettingPassword) {
      throw new HttpException(
        "Aucune demande de réinitialisation de mot de passe n'est en cours.",
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.hashPwd({ password });
    await this.prismaService.user.update({
      where: { resetPasswordToken: token },
      data: {
        password: hashedPassword,
        isResettingPassword: false,
      },
    });

    return { error: false, message: 'Mot de passe réinitialisé avec succès.' };
  }

  /**
   * Authenticate the user by generating a JWT token
   */
  private async authenticateUser({ userId }: UserPayload) {
    const payload: UserPayload = { userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
