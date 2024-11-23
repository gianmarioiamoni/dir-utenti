import { Request, Response, NextFunction } from "express";
import { getUsers } from "../userController";
import User from "../../models/User";
// import * as jestExtended from "jest-mock-extended";
import jestExtended, { mock } from "jest-mock-extended";

jest.mock("../../models/User", () => ({
  find: jest.fn().mockResolvedValueOnce([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]),
}));

describe("getUsers controller", () => {
  it("should return all users with pagination (happy path)", async () => {
    const req = mock<Request>({
      query: { page: "1" },
      // Add other necessary properties as needed
      params: {},
      body: {},
      headers: {},
      cookies: {},
    });

    // const res: Response = {
    //   json: jest.fn(),
    //   status: jest.fn().mockReturnThis(),
    //   send: jest.fn(),
    //   sendStatus: jest.fn(),
    //   // Add other necessary properties as needed
    //   locals: {},
    // };
    const res = mock<Response>(); 
    

    const next: NextFunction = jest.fn();

    await getUsers(req, res, next);

    expect(User.find).toHaveBeenCalledWith({}, { skip: 0, limit: 10 });
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ]);
    expect(next).not.toHaveBeenCalled();
  }, 10000);

  // ... other test cases
});
