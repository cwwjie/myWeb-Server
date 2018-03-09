'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg! my name is Rejiejay';
  }
}

module.exports = HomeController;
