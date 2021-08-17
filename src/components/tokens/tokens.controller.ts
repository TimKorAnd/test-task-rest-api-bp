import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokensService } from './tokens.service';

@Controller()
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

}
