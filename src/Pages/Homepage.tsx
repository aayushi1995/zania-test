import Card from '../components/Card';
import useData from '../hooks/useData';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const HomePage = () => {
    const { data, loading, error, updateData } = useData();
    const { DndContextComponent, SortableContextComponent } = useDragAndDrop({ data, updateData });
    
    return (
        <ErrorBoundary>
            <DndContextComponent>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {loading ? (
                            <div className="col-span-full">Loading...</div>
                        ) : error ? (
                            <div className="col-span-full text-red-500">{error}</div>
                        ) : data ? (
                            <SortableContextComponent>
                                {data.map(({ id, ...props }) => (
                                    <Card {...props} id={id} key={id} />
                                ))}
                            </SortableContextComponent>
                        ) : (
                            <div className="col-span-full">No data available</div>
                        )}
                    </div>
                </div>
            </DndContextComponent>
        </ErrorBoundary>
    );
};

export default HomePage;


// 1. Add Loader in Images
// 2. Calculate the positions and only send put request in case there are some changes
// 3. add Create, delete API
// 4. Add Last Saved time


