(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"d",(function(){return getScrollDataWithDefaultSize})),__webpack_require__.d(__webpack_exports__,"a",(function(){return getCustomSizesTotal})),__webpack_require__.d(__webpack_exports__,"c",(function(){return getScrollDataWithCustomSizes})),__webpack_require__.d(__webpack_exports__,"f",(function(){return shiftScroll})),__webpack_require__.d(__webpack_exports__,"b",(function(){return getItemsSize})),__webpack_require__.d(__webpack_exports__,"e",(function(){return loadPage}));var D_Node_projects_react_scroller_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(66);function applyStartOverscroll(startIndex){var overscroll=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Math.max(startIndex-overscroll,0)}function applyEndOverscroll(endIndex,totalCount){var overscroll=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return Math.min(endIndex+overscroll,totalCount-1)}function getVisibleIndexesRange(startIndex,endIndex){for(var result=[],i=startIndex;i<=endIndex;i++)result.push(i);return result}function getScrollDataWithDefaultSize(_ref){var containerSize=_ref.containerSize,defaultSize=_ref.defaultSize,totalCount=_ref.totalCount,scroll=_ref.scroll,_ref$overscroll=_ref.overscroll,overscroll=void 0===_ref$overscroll?0:_ref$overscroll,visibleElementsCount=Math.ceil(containerSize/defaultSize),maxIndex=totalCount-1,firstIndex=Math.max(Math.floor(scroll/defaultSize),0),lastIndex=Math.min(firstIndex+visibleElementsCount-1,maxIndex);return{offset:defaultSize*(firstIndex=applyStartOverscroll(firstIndex,overscroll)),visibleIndexes:getVisibleIndexesRange(firstIndex,lastIndex=applyEndOverscroll(lastIndex,totalCount,overscroll))}}function getCustomSizesTotal(_ref2){var sizes=_ref2.sizes,totalCount=_ref2.totalCount,defaultSize=_ref2.defaultSize;return Object(D_Node_projects_react_scroller_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__.a)(new Array(totalCount).keys()).reduce((function(acc,key){return acc+(sizes[key]||defaultSize)}),0)}function getScrollDataWithCustomSizes(_ref3){var targetScroll=_ref3.scroll,sizes=_ref3.sizes,containerSize=_ref3.containerSize,defaultSize=_ref3.defaultSize,totalCount=_ref3.totalCount,_ref3$overscroll=_ref3.overscroll,overscroll=void 0===_ref3$overscroll?0:_ref3$overscroll,_findNextFirstIndexAn=findNextFirstIndexAndOffset({startIndex:0,startScroll:0,targetScroll:targetScroll,totalCount:totalCount,sizes:sizes,defaultSize:defaultSize,overscroll:overscroll}),offset=_findNextFirstIndexAn.offset,firstIndex=_findNextFirstIndexAn.firstIndex;return{offset:offset,visibleIndexes:getVisibleIndexesRange(firstIndex,findLastIndex({targetScroll:targetScroll,offset:offset,firstIndex:firstIndex,sizes:sizes,totalCount:totalCount,defaultSize:defaultSize,containerSize:containerSize,overscroll:overscroll}))}}function reduceOverscrolledOffset(_ref4){var offset=_ref4.offset,overscroll=_ref4.overscroll,firstIndex=_ref4.firstIndex,sizes=_ref4.sizes,defaultSize=_ref4.defaultSize,resultOffset=offset;if(overscroll)for(var i=1;i<=overscroll;i++){var curIndex=firstIndex-i;if(curIndex<0)break;resultOffset-=sizes[curIndex]||defaultSize}return resultOffset}function findNextFirstIndexAndOffset(_ref5){for(var firstIndex,offset,startIndex=_ref5.startIndex,startScroll=_ref5.startScroll,targetScroll=_ref5.targetScroll,sizes=_ref5.sizes,totalCount=_ref5.totalCount,defaultSize=_ref5.defaultSize,_ref5$overscroll=_ref5.overscroll,overscroll=void 0===_ref5$overscroll?0:_ref5$overscroll,curIndex=startIndex,curScroll=startScroll,curOffset=startScroll;void 0===firstIndex&&curIndex<totalCount;){var curSize=sizes[curIndex]||defaultSize;(curScroll+=curSize)>=targetScroll&&(firstIndex=curIndex,offset=curOffset),curOffset+=curSize,curIndex++}return offset=reduceOverscrolledOffset({offset:offset,overscroll:overscroll,firstIndex:firstIndex,sizes:sizes,defaultSize:defaultSize}),{firstIndex:firstIndex=applyStartOverscroll(firstIndex,overscroll),offset:offset}}function findLastIndex(_ref7){for(var lastIndex,targetScroll=_ref7.targetScroll,offset=_ref7.offset,firstIndex=_ref7.firstIndex,sizes=_ref7.sizes,totalCount=_ref7.totalCount,defaultSize=_ref7.defaultSize,containerSize=_ref7.containerSize,_ref7$overscroll=_ref7.overscroll,overscroll=void 0===_ref7$overscroll?0:_ref7$overscroll,curIndex=firstIndex,curOffset=offset;void 0===lastIndex&&curIndex<=totalCount;){(curOffset+=sizes[curIndex]||defaultSize)>=targetScroll+containerSize&&(lastIndex=curIndex),curIndex++}return void 0===lastIndex&&(lastIndex=totalCount-1),lastIndex=applyEndOverscroll(lastIndex,totalCount,overscroll)}function shiftScrollBackward(_ref8){var startIndex=_ref8.startIndex,startOffset=_ref8.startOffset,targetScroll=_ref8.targetScroll,sizes=_ref8.sizes,defaultSize=_ref8.defaultSize,totalCount=_ref8.totalCount,containerSize=_ref8.containerSize,_ref8$overscroll=_ref8.overscroll,overscroll=void 0===_ref8$overscroll?0:_ref8$overscroll,_findPrevFirstIndexAn=function findPrevFirstIndexAndOffset(_ref6){for(var firstIndex,offset,startIndex=_ref6.startIndex,startScroll=_ref6.startScroll,targetScroll=_ref6.targetScroll,sizes=_ref6.sizes,defaultSize=_ref6.defaultSize,_ref6$overscroll=_ref6.overscroll,overscroll=void 0===_ref6$overscroll?0:_ref6$overscroll,curIndex=startIndex,curScroll=startScroll;void 0===firstIndex&&curIndex>=0;){(curScroll-=sizes[curIndex]||defaultSize)<=targetScroll&&(firstIndex=curIndex,offset=curScroll),curIndex--}return firstIndex!==startIndex&&(offset=reduceOverscrolledOffset({offset:offset,overscroll:overscroll,firstIndex:firstIndex,sizes:sizes,defaultSize:defaultSize}),firstIndex=applyStartOverscroll(firstIndex,overscroll)),{firstIndex:firstIndex,offset:offset}}({startIndex:startIndex,startScroll:startOffset+(sizes[startIndex]||defaultSize),targetScroll:targetScroll,sizes:sizes,defaultSize:defaultSize,overscroll:overscroll}),offset=_findPrevFirstIndexAn.offset,firstIndex=_findPrevFirstIndexAn.firstIndex;return{offset:offset,visibleIndexes:getVisibleIndexesRange(firstIndex,findLastIndex({targetScroll:targetScroll,offset:offset,firstIndex:firstIndex,sizes:sizes,totalCount:totalCount,defaultSize:defaultSize,containerSize:containerSize,overscroll:overscroll}))}}function shiftScroll(_ref10){var prevScrollData=_ref10.prevScrollData,prevScroll=_ref10.prevScroll,sizes=_ref10.sizes,scroll=_ref10.scroll,containerSize=_ref10.containerSize,totalCount=_ref10.totalCount,defaultSize=_ref10.defaultSize,_ref10$overscroll=_ref10.overscroll,overscroll=void 0===_ref10$overscroll?0:_ref10$overscroll,scrollDiff=scroll-prevScroll,firstPrevIndex=prevScrollData.visibleIndexes[0];if(scrollDiff>0){var _shiftScrollForward=function shiftScrollForward(_ref9){var startIndex=_ref9.startIndex,startOffset=_ref9.startOffset,targetScroll=_ref9.targetScroll,sizes=_ref9.sizes,defaultSize=_ref9.defaultSize,totalCount=_ref9.totalCount,containerSize=_ref9.containerSize,_ref9$overscroll=_ref9.overscroll,overscroll=void 0===_ref9$overscroll?0:_ref9$overscroll,_findNextFirstIndexAn2=findNextFirstIndexAndOffset({startIndex:startIndex,startScroll:startOffset,targetScroll:targetScroll,totalCount:totalCount,sizes:sizes,defaultSize:defaultSize,overscroll:overscroll}),offset=_findNextFirstIndexAn2.offset,firstIndex=_findNextFirstIndexAn2.firstIndex;return{offset:offset,visibleIndexes:getVisibleIndexesRange(firstIndex,findLastIndex({targetScroll:targetScroll,offset:offset,firstIndex:firstIndex,sizes:sizes,totalCount:totalCount,defaultSize:defaultSize,containerSize:containerSize,overscroll:overscroll}))}}({startIndex:firstPrevIndex,startOffset:prevScrollData.offset,targetScroll:scroll,sizes:sizes,defaultSize:defaultSize,scroll:scroll,containerSize:containerSize,totalCount:totalCount,overscroll:overscroll});return{offset:_shiftScrollForward.offset,visibleIndexes:_shiftScrollForward.visibleIndexes}}if(scrollDiff<0){var _shiftScrollBackward=shiftScrollBackward({startIndex:firstPrevIndex,startOffset:prevScrollData.offset,targetScroll:scroll,sizes:sizes,defaultSize:defaultSize,totalCount:totalCount,containerSize:containerSize,overscroll:overscroll});return{offset:_shiftScrollBackward.offset,visibleIndexes:_shiftScrollBackward.visibleIndexes}}return prevScrollData}function getItemsSize(_ref11){var _ref11$startIndex=_ref11.startIndex,startIndex=void 0===_ref11$startIndex?0:_ref11$startIndex,sizes=_ref11.sizes,count=_ref11.count,defaultSize=_ref11.defaultSize;return count?sizes&&sizes.length?Object(D_Node_projects_react_scroller_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__.a)(new Array(count).keys()).reduce((function(acc,key,index){return acc+(sizes[index+startIndex]||defaultSize)}),0):count*defaultSize:0}var loadPage=function loadPage(value,page,itemsPerPage){return value.slice(page*itemsPerPage,(page+1)*itemsPerPage)}},166:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"b",(function(){return src_ScrollerContainer})),__webpack_require__.d(__webpack_exports__,"a",(function(){return src_ScrollerCell})),__webpack_require__.d(__webpack_exports__,"d",(function(){return src_useScroller})),__webpack_require__.d(__webpack_exports__,"c",(function(){return src_Scroller}));var react=__webpack_require__(0),react_default=__webpack_require__.n(react),src_ScrollerContext=Object(react.createContext)(),objectSpread2=__webpack_require__(27),defaultArray=[],ScrollerContainer=Object(react.forwardRef)((function(_ref,ref){var value=_ref.value,width=_ref.width,height=_ref.height,defaultRowHeight=_ref.defaultRowHeight,defaultColumnWidth=_ref.defaultColumnWidth,_ref$rowsSizes=_ref.rowsSizes,rowsSizes=void 0===_ref$rowsSizes?defaultArray:_ref$rowsSizes,_ref$columnsSizes=_ref.columnsSizes,columnsSizes=void 0===_ref$columnsSizes?defaultArray:_ref$columnsSizes,style=_ref.style,className=_ref.className,onScroll=_ref.onScroll,children=_ref.children,contextValue=Object(react.useMemo)((function(){return{value:value,defaultRowHeight:defaultRowHeight,defaultColumnWidth:defaultColumnWidth,rowsSizes:rowsSizes,columnsSizes:columnsSizes}}),[value,defaultRowHeight,defaultColumnWidth,rowsSizes,columnsSizes]);return react_default.a.createElement(src_ScrollerContext.Provider,{value:contextValue},react_default.a.createElement("div",{ref:ref,style:Object(objectSpread2.a)({width:width,height:height,overflow:height&&"auto"},style),className:className,onScroll:onScroll},children))}));ScrollerContainer.__docgenInfo={description:"",methods:[],displayName:"ScrollerContainer"};var src_ScrollerContainer=ScrollerContainer;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\ScrollerContainer.js"]={name:"ScrollerContainer",docgenInfo:ScrollerContainer.__docgenInfo,path:"src\\ScrollerContainer.js"});var objectWithoutProperties=__webpack_require__(269),src_ScrollerCell=react_default.a.memo(Object(react.forwardRef)((function(_ref,ref){var style=_ref.style,rowIndex=_ref.rowIndex,columnIndex=_ref.columnIndex,_ref$Component=_ref.Component,Component=void 0===_ref$Component?"div":_ref$Component,props=Object(objectWithoutProperties.a)(_ref,["style","rowIndex","columnIndex","Component"]),_useContext=Object(react.useContext)(src_ScrollerContext),value=_useContext.value,defaultColumnWidth=_useContext.defaultColumnWidth,defaultRowHeight=_useContext.defaultRowHeight,rowsSizes=_useContext.rowsSizes,width=_useContext.columnsSizes[columnIndex]||defaultColumnWidth,height=rowsSizes[rowIndex]||defaultRowHeight,nextStyle=Object(objectSpread2.a)({},style,{height:height,width:width}),rowValue=value[rowIndex],cellValue=void 0!==columnIndex&&rowValue&&rowValue[columnIndex];return react_default.a.createElement(Component,Object.assign({ref:ref,style:nextStyle,value:cellValue||rowValue},props))}))),slicedToArray=__webpack_require__(112),utils=__webpack_require__(15),useScroller_defaultArray=[],src_useScroller=function useScroller(_ref){var defaultRowHeight=_ref.defaultRowHeight,defaultColumnWidth=_ref.defaultColumnWidth,totalRows=_ref.totalRows,totalColumns=_ref.totalColumns,_ref$rowsSizes=_ref.rowsSizes,rowsSizes=void 0===_ref$rowsSizes?useScroller_defaultArray:_ref$rowsSizes,_ref$columnsSizes=_ref.columnsSizes,columnsSizes=void 0===_ref$columnsSizes?useScroller_defaultArray:_ref$columnsSizes,width=_ref.width,height=_ref.height,lazy=_ref.lazy,onScroll=_ref.onScroll,_ref$overscroll=_ref.overscroll,overscroll=void 0===_ref$overscroll?0:_ref$overscroll,focusedCell=_ref.focusedCell,scrollerContainerRefProp=_ref.scrollerContainerRef,rowsScrollDataProp=_ref.rowsScrollData,onRowsScrollDataChangeProp=_ref.onRowsScrollDataChange,columnsScrollDataProp=_ref.columnsScrollData,onColumnsScrollDataChangeProp=_ref.onColumnsScrollDataChange,scrollerContainerRefLocal=Object(react.useRef)(),scrollerContainerRef=scrollerContainerRefProp||scrollerContainerRefLocal;Object(react.useEffect)((function focusCell(){}),[focusedCell]);var _useState=Object(react.useState)({width:"number"==typeof width?width:800,height:"number"==typeof height?height:600}),_useState2=Object(slicedToArray.a)(_useState,2),containerSizes=_useState2[0],setContainerSizes=_useState2[1],getColumnsScrollData=Object(react.useCallback)((function(scroll){if(totalColumns){var containerSize=containerSizes.width;return columnsSizes.length?Object(utils.c)({scroll:scroll,sizes:columnsSizes,containerSize:containerSize,defaultSize:defaultColumnWidth,totalCount:totalColumns,overscroll:overscroll}):Object(utils.d)({scroll:scroll,containerSize:containerSize,defaultSize:defaultColumnWidth,totalCount:totalColumns,overscroll:overscroll})}}),[containerSizes.width,columnsSizes,defaultColumnWidth,overscroll,totalColumns]),_useState3=Object(react.useState)(getColumnsScrollData(0)),_useState4=Object(slicedToArray.a)(_useState3,2),columnsScrollDataState=_useState4[0],setColumnsScrollDataState=_useState4[1],columnsScrollData=columnsScrollDataProp||columnsScrollDataState,onColumnsScrollDataChange=onColumnsScrollDataChangeProp||setColumnsScrollDataState,getRowsScrollData=Object(react.useCallback)((function(scroll){var containerSize=containerSizes.height;return rowsSizes.length?Object(utils.c)({scroll:scroll,sizes:rowsSizes,containerSize:containerSize,defaultSize:defaultRowHeight,totalCount:totalRows,overscroll:overscroll}):Object(utils.d)({scroll:scroll,containerSize:containerSize,defaultSize:defaultRowHeight,totalCount:totalRows,overscroll:overscroll})}),[containerSizes.height,defaultRowHeight,overscroll,rowsSizes,totalRows]),_useState5=Object(react.useState)(getRowsScrollData(0)),_useState6=Object(slicedToArray.a)(_useState5,2),rowsScrollDataState=_useState6[0],setRowsScrollDataState=_useState6[1],rowsScrollData=rowsScrollDataProp||rowsScrollDataState,onRowsScrollDataChange=onRowsScrollDataChangeProp||setRowsScrollDataState,prevRowsScrollData=Object(react.useRef)(),prevColumnsScrollData=Object(react.useRef)();prevRowsScrollData.current=Object(objectSpread2.a)({},rowsScrollData),prevColumnsScrollData.current=Object(objectSpread2.a)({},columnsScrollData),Object(react.useEffect)((function observeContainerResize(){if("number"!=typeof width||"number"!=typeof height){var updateContainerSize=function updateContainerSize(){var scrollerContainerRect=scrollerContainerRef.current.getBoundingClientRect();setContainerSizes((function(containerSizes){return containerSizes.width===scrollerContainerRect.width&&containerSizes.height===scrollerContainerRect.height?containerSizes:{width:scrollerContainerRect.width,height:scrollerContainerRect.height}}))},resizeCallback=function resizeCallback(){return updateContainerSize()},observer=new MutationObserver((function mutationCallback(mutations,observer){mutations.some((function(mutation){return scrollerContainerRef.current.contains(mutation.target)}))||updateContainerSize()}));return observer.observe(document.body,{attributes:!0,childList:!0,subtree:!0}),window.addEventListener("resize",resizeCallback),updateContainerSize(),function(){observer.disconnect(),window.removeEventListener("resize",resizeCallback)}}}),[width,height,scrollerContainerRef,getColumnsScrollData]),Object(react.useEffect)((function updateScrollDataOnContainerSizeChange(){if("number"!=typeof width){var _columnsScrollData=getColumnsScrollData(scrollerContainerRef.current.scrollLeft);onColumnsScrollDataChange(_columnsScrollData)}if("number"!=typeof height){var _rowsScrollData=getRowsScrollData(scrollerContainerRef.current.scrollTop);onRowsScrollDataChange(_rowsScrollData)}}),[onColumnsScrollDataChange,onRowsScrollDataChange,width,height,scrollerContainerRef,containerSizes,getColumnsScrollData,getRowsScrollData]);var prevScrollTop=Object(react.useRef)(0),prevScrollLeft=Object(react.useRef)(0),handleScroll=Object(react.useCallback)((function(e){var nextRowsScrollData,nextColumnsScrollData;totalColumns&&(nextColumnsScrollData=columnsSizes.length?Object(utils.f)({prevScrollData:prevColumnsScrollData.current,prevScroll:prevScrollLeft.current,sizes:columnsSizes,scroll:e.target.scrollLeft,containerSize:containerSizes.width,totalCount:totalColumns,defaultSize:defaultColumnWidth,overscroll:overscroll}):Object(utils.d)({containerSize:containerSizes.width,defaultSize:defaultColumnWidth,totalCount:totalColumns,scroll:e.target.scrollLeft,overscroll:overscroll}),onColumnsScrollDataChange(nextColumnsScrollData)),nextRowsScrollData=rowsSizes.length?Object(utils.f)({prevScrollData:prevRowsScrollData.current,prevScroll:prevScrollTop.current,sizes:rowsSizes,scroll:e.target.scrollTop,containerSize:containerSizes.height,totalCount:totalRows,defaultSize:defaultRowHeight,overscroll:overscroll}):Object(utils.d)({containerSize:containerSizes.height,defaultSize:defaultRowHeight,totalCount:totalRows,scroll:e.target.scrollTop,overscroll:overscroll}),onRowsScrollDataChange(nextRowsScrollData),prevScrollTop.current=e.target.scrollTop,prevScrollLeft.current=e.target.scrollLeft,onScroll&&onScroll(e)}),[onColumnsScrollDataChange,onRowsScrollDataChange,containerSizes.height,containerSizes.width,columnsSizes,rowsSizes,defaultColumnWidth,defaultRowHeight,onScroll,overscroll,totalRows,totalColumns]),visibleRowsSize=Object(react.useMemo)((function(){return lazy?Object(utils.b)({startIndex:rowsScrollData.visibleIndexes[0],sizes:rowsSizes,defaultSize:defaultRowHeight,count:rowsScrollData.visibleIndexes.length}):0}),[lazy,rowsScrollData,rowsSizes,defaultRowHeight]),coverWidth=Object(react.useMemo)((function(){if(totalColumns)return columnsSizes.length?Object(utils.a)({sizes:columnsSizes,totalCount:totalColumns,defaultSize:defaultColumnWidth}):totalColumns*defaultColumnWidth}),[columnsSizes,defaultColumnWidth,totalColumns]),coverHeight=Object(react.useMemo)((function(){return rowsSizes.length?Object(utils.a)({sizes:rowsSizes,totalCount:totalRows,defaultSize:defaultRowHeight}):totalRows*defaultRowHeight}),[rowsSizes,defaultRowHeight,totalRows]),scrollAreaStyle=Object(react.useMemo)((function(){return{height:lazy?rowsScrollData.offset+visibleRowsSize:coverHeight,width:coverWidth,position:"relative"}}),[lazy,coverHeight,coverWidth,rowsScrollData.offset,visibleRowsSize]),visibleAreaStyle=Object(react.useMemo)((function(){return{top:rowsScrollData.offset,left:columnsScrollData&&columnsScrollData.offset,position:"absolute"}}),[rowsScrollData.offset,columnsScrollData]);return{scrollerContainerRef:scrollerContainerRef,visibleRowsIndexes:rowsScrollData.visibleIndexes,visibleColumnsIndexes:columnsScrollData&&columnsScrollData.visibleIndexes,onScroll:handleScroll,scrollAreaStyle:scrollAreaStyle,visibleAreaStyle:visibleAreaStyle}},Scroller_defaultArray=[],Scroller=Object(react.forwardRef)((function(inputProps,ref){var scrollerProps=src_useScroller(Object(objectSpread2.a)({},inputProps,{scrollerContainerRef:ref})),props=Object(objectSpread2.a)({},inputProps,{},scrollerProps),style=props.style,className=props.className,visibleRowsIndexes=props.visibleRowsIndexes,visibleColumnsIndexes=props.visibleColumnsIndexes,onScroll=props.onScroll,width=props.width,height=props.height,scrollAreaStyle=props.scrollAreaStyle,visibleAreaStyle=props.visibleAreaStyle,scrollerContainerRef=props.scrollerContainerRef,_props$rowsSizes=props.rowsSizes,rowsSizes=void 0===_props$rowsSizes?Scroller_defaultArray:_props$rowsSizes,_props$columnsSizes=props.columnsSizes,columnsSizes=void 0===_props$columnsSizes?Scroller_defaultArray:_props$columnsSizes,defaultRowHeight=props.defaultRowHeight,defaultColumnWidth=props.defaultColumnWidth,value=props.value,CellComponent=props.CellComponent,cellComponentProps=props.cellComponentProps,_props$RowComponent=props.RowComponent,RowComponent=void 0===_props$RowComponent?"div":_props$RowComponent,rowComponentProps=props.rowComponentProps,elements=visibleRowsIndexes.map((function(rowIndex){if(visibleColumnsIndexes){var columnsElements=visibleColumnsIndexes.map((function(columnIndex){return react_default.a.createElement(src_ScrollerCell,Object.assign({Component:CellComponent,key:"".concat(rowIndex,"-").concat(columnIndex),rowIndex:rowIndex,columnIndex:columnIndex},cellComponentProps))}));return react_default.a.createElement(RowComponent,Object.assign({key:rowIndex},rowComponentProps),columnsElements)}return react_default.a.createElement(src_ScrollerCell,Object.assign({Component:CellComponent,key:rowIndex,rowIndex:rowIndex},cellComponentProps))}));return react_default.a.createElement(src_ScrollerContainer,{ref:scrollerContainerRef,style:style,className:className,value:value,rowsSizes:rowsSizes,columnsSizes:columnsSizes,defaultRowHeight:defaultRowHeight,defaultColumnWidth:defaultColumnWidth,onScroll:onScroll,width:width,height:height},react_default.a.createElement("div",{style:scrollAreaStyle},react_default.a.createElement("div",{style:visibleAreaStyle},elements)))}));Scroller.__docgenInfo={description:"",methods:[],displayName:"Scroller"};var src_Scroller=Scroller;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\Scroller.js"]={name:"Scroller",docgenInfo:Scroller.__docgenInfo,path:"src\\Scroller.js"})},270:function(module,exports,__webpack_require__){__webpack_require__(271),__webpack_require__(417),module.exports=__webpack_require__(418)},335:function(module,exports){},418:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(111),req=__webpack_require__(607);Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)((function loadStories(){req.keys().forEach((function(filename){return req(filename)}))}),module)}.call(this,__webpack_require__(211)(module))},607:function(module,exports,__webpack_require__){var map={"./Scroller.stories.js":608};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=607},608:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__.d(__webpack_exports__,"generateRandomSizes",(function(){return generateRandomSizes})),__webpack_require__.d(__webpack_exports__,"listValue",(function(){return listValue})),__webpack_require__.d(__webpack_exports__,"ListTestComponent",(function(){return ListTestComponent})),__webpack_require__.d(__webpack_exports__,"GridTestComponent",(function(){return GridTestComponent})),__webpack_require__.d(__webpack_exports__,"loadPageAsync",(function(){return loadPageAsync})),__webpack_require__.d(__webpack_exports__,"syncListWithDefaultSizes",(function(){return syncListWithDefaultSizes})),__webpack_require__.d(__webpack_exports__,"syncListWithRandomSizes",(function(){return syncListWithRandomSizes})),__webpack_require__.d(__webpack_exports__,"syncGridWithDefaultSizes",(function(){return syncGridWithDefaultSizes})),__webpack_require__.d(__webpack_exports__,"syncGridWithRandomSizes",(function(){return syncGridWithRandomSizes}));var D_Node_projects_react_scroller_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(66),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__),_storybook_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(111),_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(15),___WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(166),generateRandomSizes=(__webpack_require__(609),function generateRandomSizes(count,start,end){return Object(D_Node_projects_react_scroller_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__.a)(new Array(count).keys()).map((function(){return getRandomInt(start,end)}))}),generateMeta=function generateMeta(count){return Object(D_Node_projects_react_scroller_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__.a)(new Array(count).keys())},getRandomInt=function getRandomInt(min,max){return min=Math.ceil(min),max=Math.floor(max),Math.floor(Math.random()*(max-min+1))+min},listValue=function generateListValues(count){return generateMeta(count).map((function(row){return"Value ".concat(row)}))}(1e3),rowsSizes=generateRandomSizes(listValue.length,40,120),ListCellComponent=function ListCellComponent(_ref){var value=_ref.value,style=_ref.style;return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{style:style},value||"Loading...")},ListTestComponent=function ListTestComponent(props){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_4__.c,Object.assign({CellComponent:ListCellComponent},props))},gridValue=function generateGridValues(rowsCount,columnsCount){return generateMeta(rowsCount).map((function(row){return generateMeta(columnsCount).map((function(column){return"Value ".concat(row," - ").concat(column)}))}))}(1e3,50),columnsSizes=generateRandomSizes(gridValue[0].length,80,250),GridCellComponent=function GridCellComponent(_ref2){var value=_ref2.value,style=_ref2.style;return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:"cell",style:style},value||"Loading...")},GridTestComponent=function GridTestComponent(props){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_4__.c,Object.assign({CellComponent:GridCellComponent},props))},loadPageAsync=function loadPageAsync(value){return function(page,itemsPerPage){return new Promise((function(resolve){setTimeout((function(){console.log("Loading async page %s",page);var result=Object(_utils__WEBPACK_IMPORTED_MODULE_3__.e)(value,page,itemsPerPage);resolve(result)}),1e3)}))}},syncListWithDefaultSizes=function syncListWithDefaultSizes(props){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ListTestComponent,Object.assign({defaultRowHeight:40,totalRows:gridValue.length,value:listValue,height:"100vh",overscroll:2},props))},syncListWithRandomSizes=function syncListWithRandomSizes(props){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ListTestComponent,Object.assign({defaultRowHeight:40,totalRows:gridValue.length,rowsSizes:rowsSizes,value:listValue,height:"100vh",overscroll:2},props))},syncGridWithDefaultSizes=function syncGridWithDefaultSizes(props){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(GridTestComponent,Object.assign({defaultRowHeight:40,defaultColumnWidth:150,totalRows:gridValue.length,totalColumns:gridValue[0].length,value:gridValue,height:"100vh",overscroll:2,rowComponentProps:{className:"row"}},props))},syncGridWithRandomSizes=function syncGridWithRandomSizes(props){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(GridTestComponent,Object.assign({defaultRowHeight:40,defaultColumnWidth:150,rowsSizes:rowsSizes,columnsSizes:columnsSizes,totalRows:gridValue.length,totalColumns:gridValue[0].length,value:gridValue,height:"100vh",overscroll:2,rowComponentProps:{className:"row"}},props))};Object(_storybook_react__WEBPACK_IMPORTED_MODULE_2__.storiesOf)("Scroller",module).add("sync list with default row sizes",syncListWithDefaultSizes).add("sync list with random row sizes",syncListWithRandomSizes).add("sync grid with default sizes",syncGridWithDefaultSizes).add("sync grid with random sizes",syncGridWithRandomSizes),ListTestComponent.__docgenInfo={description:"",methods:[],displayName:"ListTestComponent"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\Scroller.stories.js"]={name:"ListTestComponent",docgenInfo:ListTestComponent.__docgenInfo,path:"src\\Scroller.stories.js"}),GridTestComponent.__docgenInfo={description:"",methods:[],displayName:"GridTestComponent"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\Scroller.stories.js"]={name:"GridTestComponent",docgenInfo:GridTestComponent.__docgenInfo,path:"src\\Scroller.stories.js"}),syncListWithDefaultSizes.__docgenInfo={description:"",methods:[],displayName:"syncListWithDefaultSizes"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\Scroller.stories.js"]={name:"syncListWithDefaultSizes",docgenInfo:syncListWithDefaultSizes.__docgenInfo,path:"src\\Scroller.stories.js"}),syncListWithRandomSizes.__docgenInfo={description:"",methods:[],displayName:"syncListWithRandomSizes"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\Scroller.stories.js"]={name:"syncListWithRandomSizes",docgenInfo:syncListWithRandomSizes.__docgenInfo,path:"src\\Scroller.stories.js"}),syncGridWithDefaultSizes.__docgenInfo={description:"",methods:[],displayName:"syncGridWithDefaultSizes"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\Scroller.stories.js"]={name:"syncGridWithDefaultSizes",docgenInfo:syncGridWithDefaultSizes.__docgenInfo,path:"src\\Scroller.stories.js"}),syncGridWithRandomSizes.__docgenInfo={description:"",methods:[],displayName:"syncGridWithRandomSizes"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\Scroller.stories.js"]={name:"syncGridWithRandomSizes",docgenInfo:syncGridWithRandomSizes.__docgenInfo,path:"src\\Scroller.stories.js"})}.call(this,__webpack_require__(211)(module))},609:function(module,exports,__webpack_require__){}},[[270,1,2]]]);
//# sourceMappingURL=main.02c35ebcd5546158a91b.bundle.js.map