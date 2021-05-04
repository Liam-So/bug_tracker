// Generate Ticket Id
export function getTicketId(): string {
  return Math.random().toString(20).substr(2, 6);
}

export const getUserIdsFromArray = (arrayOfUsers: any | null) => {
  const res: string[] = [];
  if (arrayOfUsers) {
    arrayOfUsers.forEach((item: any) => {
      res.push(item.userId);
    });
  }

  return res;
}
