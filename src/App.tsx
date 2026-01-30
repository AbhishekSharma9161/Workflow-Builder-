
import { WorkflowProvider } from './store/WorkflowContext';
import { WorkflowCanvas } from './components/WorkflowCanvas';
import { Layout } from './components/Layout';

function App() {
    return (
        <WorkflowProvider>
            <Layout>
                <WorkflowCanvas />
            </Layout>
        </WorkflowProvider>
    );
}

export default App;
