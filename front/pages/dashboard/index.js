import React, { useState } from 'react';
import Head from 'next/head';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
import Widgets from '@iso/containers/Widgets/Widgets';
import mqtt from 'mqtt';

export default withAuthSync(() => {
  const [connectionStatus, setConnectionStatus] = useState(false);
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <DashboardLayout>
        <Widgets />
      </DashboardLayout>
    </>
  )
});
