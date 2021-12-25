import { encryptPassword } from 'src/utils/cryptogram';
import { AdminService } from './../../modules/admin/admin.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}
  // JWT验证 - Step 2: 校验用户信息
  async validateUser(account: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const admin: any = await this.adminService.findByAccount(account);
    if (admin) {
      // 禁用情况
      if (!admin.status) {
        return {
          data: {},
          statusCode: 400,
          message: '该用户禁用中,请解封后再重试!',
        };
      }
      // 允许登录
      const passwordSalt: string = encryptPassword(
        password,
        admin.password_salt,
      );

      if (passwordSalt === admin.password) {
        return {
          data: admin,
          statusCode: 200,
          message: '登录成功',
        };
      } else {
        console.log(admin);
        console.log(passwordSalt);
        // 密码不正确
        return {
          data: {},
          statusCode: 201,
          message: '密码不正确，请重试！',
        };
      }
    } else {
      // 用户不存在
      return {
        data: {},
        statusCode: 500,
        message: '该账户不存在！',
      };
    }
  }
  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload: any = {
      username: user.username,
      account: user.account,
      id: user._id,
      roleId: user.roleId,
      petsId: user.petsId || null,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token: string = this.jwtService.sign(payload);
      return {
        statusCode: 200,
        data: token,
      };
    } catch (error) {
      return {
        statusCode: 600,
        message: `账号或密码错误`,
      };
    }
  }
  // JWT decode token - Step 获取token参数
  async getToken(authorizations) {
    if (authorizations) {
      const token = authorizations.split(' ')[1];
      return await this.jwtService.decode(token);
    }
  }
}
