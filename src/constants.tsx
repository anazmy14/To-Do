import { v4 as uuid } from "uuid";

export const columns = {
    [uuid()]: {
      name: "To Do",
      order: 1,
    },
  
    [uuid()]: {
      name: "In Progress",
      order: 2,
    },
  
    [uuid()]: {
      name: "Done",
      order: 3,
    },
  };
  