import React from 'react';
import Head from 'next/head';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
import Widgets from '@iso/containers/Widgets/Widgets';
import Button from '@iso/components/uielements/button';

export default withAuthSync(() => (
  <>
    <Head>
      <title>Home page</title>
    </Head>
    <DashboardLayout>
      <Widgets>
        <Button type="primary">
        </Button>
      </Widgets>

    </DashboardLayout>
  </>
));
