import { createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator((data, req) => {
    return req.user;
});

// After
// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const GetUser = createParamDecorator(
//     (data: unknown, ctx: ExecutionContext) => {
//         const request = ctx.switchToHttp().getRequest();
//         return request.user;
//     },
// );
