import { queryOne } from "../../utils/query.helper";

const testRepo = {
  getData: async (name: string) => {
    return await queryOne("SELECT * FROM users WHERE name = $1", [name]);
  },
};

export default testRepo;
