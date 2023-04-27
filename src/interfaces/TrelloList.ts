interface ListLimits {
  cards: {
    openPerList: {
      status: string | null;
      disableAt: number;
      warnAt: number;
    };
    totalPerList: {
      status: string | null;
      disableAt: number;
      warnAt: number;
    };
  };
}

export default interface TrelloList {
  id: string;
  name: string;
  closed: boolean;
  idBoard: string;
  pos: number;
  subscribed: boolean;
  softLimit: number | null;
  status: string | null;
  creationMethod: string;
  idOrganization: string;
  limits: ListLimits;
  nodeId: string;
}
