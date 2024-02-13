import { Response, Request } from "express";
// import instance from "../../infra/cache/redis";
import UsersService from "./service";

import { UserInterface } from "../../datatypes/interfaces";

const service= new UsersService();

export default class UserController {

  async GetUsers(req: Request, res: Response) {
    const { p = 1, q } = req.query;

    const limit = 10;
    const page = Number(p);
    const query = q as string;

    const skip = (page - 1) * limit;
    const take = limit;

    let total: number = 0;

    let users: UserInterface[] = [];

    if (query) {
    
      users = await service.fetchByQuery(query, limit);
    
    } else {
      // const cachedData = await instance.get("users:level1");
      const cachedData = null;

      if (page == 1 && cachedData) {
        
        // const cachedTotal = await instance.get("users:total");

        users = JSON.parse(cachedData);
        // total = JSON.parse(cachedTotal!);

      } else {
        
        var { data, count } = await service.fetchAll(skip, take);
       
        total = count;
        users = data;

        // if(page == 1){
        //   await instance.set("users:level1", JSON.stringify(data));
        //   await instance.set("users:total", count);
        // }
      }
    }

    return res
      .json({
        data: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / 15),
          users,
        },
      })
      .status(200);
  }
}
