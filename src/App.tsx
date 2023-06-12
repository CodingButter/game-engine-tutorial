// import ObjectMenu from "components/ObjectMenu"
//import AssetManagerMenu from 'components/AssetManagerMenu';
import { TitanProvider } from 'hooks/useTitan';
import { useEffect,useRef } from 'react';
import Splitter from 'components/Splitter';
import { useResizable } from 'react-resizable-layout';
import useLocalStorage from 'hooks/useLocalStorage';
import classNames from 'classnames';
import Toolbar from 'components/Toolbar';
import Hierarchy from 'components/Hierarchy';

function App() {
  const canvasWrapper = useRef(null)
  const [hierarchyExpanded, setHierarchyExpanded] = useLocalStorage("hierarchyExpandedState", true);
  const [hierarchyPosition, setHierarchyPosition] = useLocalStorage("hierarchyPosition", 250)
  const [inspectorPosition, setInspectorPosition] = useLocalStorage("inspectorPosition", 250)
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
    <TitanProvider canvasWrapper={canvasWrapper}>
        
      <div className={"flex h-screen w-screen flex-col text-neutral-100 overflow-hidden relative z-10"}>
        <div className={"flex grow"}>
          <div className={classNames(hierarchyExpanded?"bg-neutral-600":"bg-neutral-700"," shrink-0 flex items-start justify-start h-full overflow-hidden", isHierarchyDragging ? "dragging" : "")} style={{ width: hierarchyExpanded?hierarchyDragPosition|0:74 }}>
            <div className='flex justify-start items-start'>
              <Toolbar />
            </div>
            <div className="flex justify-start items-start w-full">
              <Hierarchy expanded={hierarchyExpanded} setExpanded={setHierarchyExpanded} />
            </div>
          </div>
          <Splitter id="HierarchySplitter" dir="vertical" isDragging={isHierarchyDragging} {...hierarchyDragBarProps} />
          <div className={"flex flex-col grow justify-center items-center"}>
            <div className={"grow shrink-0"}>
              <div ref={canvasWrapper} className="w-full h-full flex justify-center items-center"></div>
            </div>
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
        <div className="bg-neutral-650 flex justify-start items-start p-2 py-0 text-[12px] font-thin text-neutral-300">modify selection</div>
      </div>
    </TitanProvider>
  );
}

export default App;
