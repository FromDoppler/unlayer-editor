export type SubscriptionListItem = {
  listId: string;
  name: string;
};

export type ResultCreateSubscriptionList = {
  success: boolean;
  errorCode: number;
  listId: string;
};

export type ResultSubscriptionList = {
  success: boolean;
  subscriptionList: SubscriptionListItem[];
};

export type ErrorCreatList =
  | 'empty_name'
  | 'duplicated_list_name'
  | 'maximum_number_of_lists_reached'
  | 'other_error';
