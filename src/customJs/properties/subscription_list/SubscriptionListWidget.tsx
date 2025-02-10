import { React, useEffect, useState } from '../../unlayer-react';
import { WidgetComponent } from '../../types';
import { requestDopplerApp } from '../../utils/dopplerAppBridge';
import { $t } from '../../localization';
import { Modal } from '../../components/Modal';
import {
  DropdownOption,
  UnlayerDropdown,
} from '../../components/UnlayerDropdown';
import {
  ErrorCreatList,
  ResultCreateSubscriptionList,
  ResultSubscriptionList,
  SubscriptionListItem,
} from './types';

export const subscriptionListWidget: WidgetComponent<string, void> = ({
  value,
  updateValue,
}) => {
  const { loading, SubscriptionLists } = useSubscriptionList({ value });
  const changeValue = (e: any) => updateValue(e.target.value);
  const [modalOpen, setModalOpen] = useState(false);

  const [listName, setListName] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorCreateList, setErrorCreateList] =
    useState<ErrorCreatList>('other_error');

  const loadingStyle = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  } as const;

  const containerStyle = {
    display: 'flex',
    margin: '5px',
    font: '400 1em Roboto,sans-serif',
    color: '#333',
  } as const;

  const changeListValue = (e: string) => {
    setListName(e);
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div className="spinner-border text-secondary" role="status"></div>
        <span className="visually-hidden" style={containerStyle}>
          {$t('labels.loading')}...
        </span>
      </div>
    );
  }

  const createListSetErrorCode = (code: number): ErrorCreatList => {
    switch (code) {
      case 2:
        return 'duplicated_list_name';
      case 3:
        return 'maximum_number_of_lists_reached';
      default:
        return 'other_error';
    }
  };
  const createNewSubscriptionList = () => {
    if (listName === '') {
      setHasError(true);
      setErrorCreateList('empty_name');
      return;
    }
    requestDopplerApp({
      action: 'CreateSubscriptionList',
      listName,
      callback: (result: ResultCreateSubscriptionList) => {
        if (result.success) {
          updateValue(result.listId);
          setModalOpen(false);
        } else {
          const input = document.querySelector(
            '#dp_sm_input_new_list',
          ) as HTMLInputElement;
          input.value = '';
          setHasError(true);
          setErrorCreateList(createListSetErrorCode(result.errorCode));
        }
      },
    });
  };

  return (
    <div role="container" className="blockbuilder-widget row">
      <div className="col-12">
        <Modal
          open={modalOpen}
          size="S"
          titleContent={$t('_dp.smart_forms.action.create_list')}
          primaryAction={{
            label: $t('_dp.smart_forms.action.modal_list.save'),
            primaryFn: () => createNewSubscriptionList(),
            style: { color: 'white', backgroundColor: 'rgb(0, 0, 0)' },
          }}
          cancelAction={{
            label: $t('buttons.cancel'),
            cancelFn: () => {
              setHasError(false);
              setModalOpen(false);
            },
            style: {
              backgroundColor: 'transparent',
            },
          }}
          content={
            <>
              <form
                style={{
                  width: '100%',
                  margin: '0 20px',
                }}
              >
                <label>{$t('_dp.smart_forms.action.modal_list.label')}</label>
                <input
                  id="dp_sm_input_new_list"
                  style={{
                    display: 'flex',
                    width: '100%',
                    lineHeight: '1.25rem',
                    fontSize: '13px',
                    padding: '0.75rem 1rem',
                    color: 'rgb(125, 125, 125)',
                    backgroundColor: 'rgb(249, 249, 249)',
                    border: '1px solid rgb(212, 212, 212)',
                  }}
                  onFocus={() => setHasError(false)}
                  onBlur={(e) => {
                    changeListValue(e.target.value);
                  }}
                  className="input"
                  placeholder={$t(
                    '_dp.smart_forms.action.modal_list.input_placeholder',
                  )}
                  type="text"
                  aria-label="new-list-name-input"
                />
                {hasError && (
                  <div style={{ color: '#a63a33', marginTop: '10px' }}>
                    <p>
                      {(() => {
                        switch (errorCreateList) {
                          case 'empty_name':
                            return $t(
                              '_dp.smart_forms.action.modal_list.error.empty_name',
                            );
                          case 'duplicated_list_name':
                            return $t(
                              '_dp.smart_forms.action.modal_list.error.duplicated_list_name',
                            );
                          case 'maximum_number_of_lists_reached':
                            return $t(
                              '_dp.smart_forms.action.modal_list.error.maximum_number_of_lists_reached',
                            );
                          default:
                            return $t(
                              '_dp.smart_forms.action.modal_list.error.other_error',
                            );
                        }
                      })()}
                    </p>
                  </div>
                )}
              </form>
            </>
          }
        />
        {SubscriptionLists.length === 0 ? (
          <p>{$t('_dp.smart_forms.action.empty_list')}</p>
        ) : (
          <UnlayerDropdown
            value={value}
            label={$t('_dp.smart_forms.action.label')}
            options={SubscriptionLists}
            updateValue={changeValue}
          />
        )}

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button
            type="button"
            style={{ height: '40px', width: '80%' }}
            className="btn btn-primary btn-sm"
            onClick={() => setModalOpen(true)}
          >
            {$t('_dp.smart_forms.action.create_list')}
          </button>
        </div>
      </div>
    </div>
  );
};

const useSubscriptionList = ({ value }: { value: string }) => {
  const [loading, setLoading] = useState(false);
  const [SubscriptionLists, setSubscriptionLists] = useState<DropdownOption[]>(
    [],
  );

  useEffect(() => {
    setLoading(true);

    const { destructor } = requestDopplerApp({
      action: 'getSubscriptionList',
      callback: (result: ResultSubscriptionList) => {
        const itemsMapped = result.subscriptionList.map(
          (v: SubscriptionListItem) => {
            return {
              label: v.name,
              value: v.listId,
            };
          },
        );
        setSubscriptionLists(itemsMapped);
        setLoading(false);
      },
    });

    return destructor;
  }, [value]);

  return {
    loading,
    SubscriptionLists,
  };
};
