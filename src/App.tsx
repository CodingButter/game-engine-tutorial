import { useResizable } from  'react-resizable-layout';
import { useEffect }    from  'react';
import Providers        from  'Providers';
import classNames       from  'classnames';
import useLocalStorage  from  'hooks/useLocalStorage';
import ActionPanel      from  'hooks/useActionPanel';
import Splitter         from  'components/editor/multis/Splitter';
import Toolbar          from  'components/editor/singletons/Toolbar';
import Hierarchy        from  'components/editor/singletons/Hierarchy';

function App() {
 
  const [hierarchyExpanded, setHierarchyExpanded]       = useLocalStorage("hierarchyExpandedState", true);
  const [hierarchyPosition, setHierarchyPosition]       = useLocalStorage("hierarchyPosition", 250)
  const [inspectorPosition, setInspectorPosition]       = useLocalStorage("inspectorPosition", 250)
  const [assetManagerPosition, setAssetManagerPosition] = useLocalStorage("assetManagerPosition", 250)

  const { isDragging: isHierarchyDragging, endPosition:hierarchyEndPosition, position: hierarchyDragPosition, separatorProps: hierarchyDragBarProps } = useResizable({
    axis: 'x',
    min: 245,
    max: 600,
    initial: hierarchyPosition
  })

  const { isDragging: isInspectorDragging, endPosition:inpectorEndPosition, position: inspectorDragPosition, separatorProps: inspectorDragBarProps } = useResizable({
    axis: 'x',
    max: 600,
    reverse: true,
    initial: inspectorPosition
  })

  const { isDragging: isAssetManagerDragging, endPosition:assetManagerEndPosition, position: assetManagerDragPosition, separatorProps: assetManagerDragBarProps } = useResizable({
    axis: 'y',
    min: 150,
    max: 600,
    initial: assetManagerPosition,
    reverse: true
  })
  
  useEffect(() => {
    setHierarchyPosition(hierarchyExpanded?hierarchyDragPosition|0:74)
  }, [hierarchyEndPosition, setHierarchyPosition, hierarchyExpanded, hierarchyDragPosition])

  useEffect(() => {
    setInspectorPosition(inpectorEndPosition|0)
  }, [inpectorEndPosition, setInspectorPosition])

  useEffect(() => {
    setAssetManagerPosition(assetManagerEndPosition|0)
  }, [assetManagerEndPosition, setAssetManagerPosition])
  
  return (
    <Providers>
      <div className={"w-screen h-screen overflow-clip justify-center items-center flex absolute top-0 left-0"}>      
      </div>
      <div className={"flex h-screen w-screen flex-col text-neutral-100 overflow-hidden relative z-20"}>
        <div className={"flex grow"}>
          <div className={classNames(hierarchyExpanded?"bg-neutral-600":"bg-neutral-700"," shrink-0 flex items-start justify-start h-full overflow-hidden z-20", isHierarchyDragging ? "dragging" : "")} style={{ width: hierarchyExpanded?hierarchyDragPosition|0:74 }}>
            <div className='flex justify-start items-start'>
              <Toolbar />
            </div>
            <div className="flex justify-start items-start w-full">
              <Hierarchy expanded={hierarchyExpanded} setExpanded={setHierarchyExpanded} />
            </div>
          </div>
          <Splitter id="HierarchySplitter" dir="vertical" isDragging={isHierarchyDragging} {...hierarchyDragBarProps} />
          <div className={"flex flex-col grow justify-center items-center"}>
            <div className={"grow shrink-0 flex justify-center items-center w-full h-full"}></div>
            <Splitter id="AssetManagerSplitter" dir="horizontal" isDragging={isAssetManagerDragging} {...assetManagerDragBarProps} />
            <div className={classNames("bg-neutral-400 shrink-0 grid place-items-center w-full", isAssetManagerDragging ? "dragging" : "")} style={{ height: assetManagerDragPosition|0 }}>
              Asset Manager
            </div>
          </div>
          <Splitter id="InpsectorSplitter" dir="vertical" isDragging={isInspectorDragging} {...inspectorDragBarProps} />
          <div className={classNames("bg-neutral-400 shrink-0 grid place-items-center z-20 relative", isInspectorDragging ? "dragging" : "")} style={{ width: inspectorDragPosition|0 }}>
            Inspector
          </div>
        </div>
        <div className="z-20 bg-neutral-650 flex justify-start items-start p-2 py-0 text-[12px] font-thin text-neutral-300">
          <ActionPanel />
        </div>
      </div>
    </Providers>
  );
}

export default App;
