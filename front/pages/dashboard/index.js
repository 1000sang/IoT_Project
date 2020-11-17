import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
import Widgets from '@iso/containers/Widgets/Widgets';

import io from 'socket.io-client';

const socketClient = io('http://localhost:3065', { transports: ['websocket'] });

function socketConnect() {
  socketClient.on('connect', () => {
    console.log('socket connected');
  })
}


export default withAuthSync(() => {
  socketConnect();

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