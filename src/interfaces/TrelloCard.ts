interface CardBadges {
  attachmentsByType: {
    trello: {
      board: number;
      card: number;
    };
  };
  location: boolean;
  votes: number;
  viewingMemberVoted: boolean;
  subscribed: boolean;
  fogbugz: string;
  checkItems: number;
  checkItemsChecked: number;
  checkItemsEarliestDue: string | null;
  comments: number;
  attachments: number;
  description: boolean;
  due: string | null;
  dueComplete: boolean;
  start: string | null;
}

interface CardLimits {
  attachments: {
    perCard: {
      status: string;
      disableAt: number;
      warnAt: number;
    };
  };
  checklists: {
    perCard: {
      status: string;
      disableAt: number;
      warnAt: number;
    };
  };
  stickers: {
    perCard: {
      status: string;
      disableAt: number;
      warnAt: number;
    };
  };
}

interface CardCover {
  idAttachment: string | null;
  color: string | null;
  idUploadedBackground: string | null;
  size: string;
  brightness: string;
  idPlugin: string | null;
}

export default interface TrelloCard {
  id: string;
  address: string | null;
  badges: CardBadges;
  checkItemStates: string | null;
  closed: boolean;
  coordinates: string | null;
  creationMethod: string | null;
  dueComplete: boolean;
  dateLastActivity: string;
  desc: string;
  descData: {
    emoji: Record<string, unknown>;
  };
  due: string | null;
  dueReminder: string | null;
  email: string;
  idBoard: string;
  idChecklists: string[];
  idLabels: string[];
  idList: string;
  idMembers: string[];
  idMembersVoted: string[];
  idShort: 12;
  idAttachmentCover: string | null;
  labels: any[];
  limits: CardLimits;
  locationName: string | null;
  manualCoverAttachment: boolean;
  name: string;
  pos: number;
  shortLink: string;
  shortUrl: string;
  staticMapUrl: string | null;
  start: string | null;
  subscribed: boolean;
  url: string;
  cover: CardCover;
  isTemplate: boolean;
  cardRole: string | null;
  attachments: any[];
  pluginData: any[];
  customFieldItems: any[];
}
