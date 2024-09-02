import Card from '../components/Card';
import useData from '../hooks/useData';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Spinner from '../components/Spinner';

const HomePage = () => {
    const { data, lastSave, loading, error, updateData } = useData();
    const { DndContextComponent, SortableContextComponent } = useDragAndDrop({ data, updateData });
  
    return (
        <ErrorBoundary>
            {loading && <Spinner/>}
            <DndContextComponent>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2">
                        {error ? (
                            <div className="col-span-full text-red-500">{error}</div>
                        ) : data ? (
                            <>
                            <SortableContextComponent>
                                {data.map(({ id, ...props }) => (
                                    <Card key={id} {...props} id={id}/>
                                ))}
                            </SortableContextComponent>
                            </>
                        ) : (
                            <div className="col-span-full">No data available</div>
                        )}
                    </div>
                </div>
            </DndContextComponent>
            <div className='text-center mt-4 text-gray-500 text-sm'>{lastSave && `Last Saved Time: `+ new Date(lastSave).toTimeString()}</div>

        </ErrorBoundary>
    );
};

export default HomePage;



