import { ReactPropertyDefinition } from '../../types';
import { subscriptionListWidget } from './SubscriptionListWidget';

export const subscriptionListPropertyEditor = 'subscription_list';
type subscriptionListPropertyEditor = typeof subscriptionListPropertyEditor;

export const subscriptionListPropertyEditorDefinition: ReactPropertyDefinition<
  subscriptionListPropertyEditor,
  string,
  void
> = {
  name: subscriptionListPropertyEditor,
  Widget: subscriptionListWidget,
};

export const subscriptionListProperty = ({
  defaultValue,
}: {
  defaultValue?: string;
  label?: string;
} = {}) =>
  ({
    defaultValue,
    widget: subscriptionListPropertyEditor,
  }) as const;
