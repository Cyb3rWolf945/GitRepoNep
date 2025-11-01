const bcryptjs = modules.bcryptjs;

const email = "ajosegoncalves01@gmail.com";

const entity = await entities.users
  .createQueryBuilder("alias")
  .select()
  .where("alias.EMAIL = :EMAIL", { EMAIL: email })
  .getOne();

console.log(entity);

