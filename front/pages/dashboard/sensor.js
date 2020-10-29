import Head from 'next/head';
import SensorChart from '@iso/containers/Sensor/SensorChart';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
    <>
        <Head>
            <title>Sensor Chart</title>
        </Head>
        <DashboardLayout>
            <SensorChart />
        </DashboardLayout>
    </>
));
