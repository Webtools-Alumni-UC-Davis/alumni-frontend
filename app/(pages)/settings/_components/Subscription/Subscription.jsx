"use client";
import React, { useState, useEffect } from 'react';
import styles from './Subscription.module.scss';
import Switch from 'react-switch';

const Subscription = () => {
  const email = 'khphan@ucdavis.edu'; // Hardcoded email
  const [subscribed, setSubscribed] = useState(null);
  const [originalSubscribed, setOriginalSubscribed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchSubscriptionStatus();
    fetchRemoteUser();
  }, []);

  const fetchRemoteUser = async () => {
    try {
      const response = await fetch(
        'api')
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  console.log(user);

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(
          `https://webtools-api.engr.ucdavis.edu/emails/check-subscription?email=${email}`
      );
      const data = await response.json();
      setSubscribed(data.subscribed);
      setOriginalSubscribed(data.subscribed);
    } catch (error) {
      console.error('Error fetching subscription status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchChange = (checked) => {
    if (checked !== originalSubscribed) {
      setSubscribed(checked);
      setChangesMade(true);
    } else {
      if (changesMade) {
        setChangesMade(false);
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      setSuccessMessage('');
      setErrorMessage('');

      const intendedAction = subscribed ? 'subscribe' : 'unsubscribe';
      const oppositeAction = subscribed ? 'unsubscribe' : 'subscribe';

      if (originalSubscribed === subscribed) {
        setErrorMessage(`Already ${intendedAction}d`);
        return;
      }

      const endpoint = subscribed
          ? "https://webtools-api.engr.ucdavis.edu/emails/subscribe"
          : "https://webtools-api.engr.ucdavis.edu/emails/unsubscribe";

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, // make sure this is their actual ucdavis email
          name: 'User', // Replace with user's name
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      setSuccessMessage(`Successfully ${intendedAction}d`);
      setOriginalSubscribed(subscribed);
      setChangesMade(false);
    } catch (error) {
      console.error('Error saving changes:', error);
      setErrorMessage('Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {loading && <p>Loading...</p>}
      {!loading && subscribed !== null && (
        <>
          <p>Monthly Email Updates:</p>
          <div className={styles.subscription}>
            <label htmlFor="material-switch">
              {subscribed ? 'Subscribed' : 'Unsubscribed'}
            </label>
            <Switch
              checked={subscribed}
              onChange={handleSwitchChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={24}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
            />
          </div>
          {(changesMade || successMessage || errorMessage) && (
            <div className={styles.statement}>
              <div className={styles.changes}>
                {successMessage && <p className={styles.success}>{successMessage}</p>}
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <div className={styles.button_end}>
                  <button onClick={handleSaveChanges} className={styles.button}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Subscription;