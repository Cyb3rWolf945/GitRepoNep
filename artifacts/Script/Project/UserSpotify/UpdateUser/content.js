/*
    This code snippet updates a selected row/record,
    setting new values for specified fields, where the entity's ID is equal to 1.
*/
await entities.users
  .createQueryBuilder()
  .update()
  .set({
    EMAIL: "smalltext",
    PASSWORD_HASH: "smalltext",
    DISPLAY_NAME: "smalltext",
    createdBy: "text",
    updatedBy: "text",
  })
  .where("id = :id", { id: 1 })
  .execute();
