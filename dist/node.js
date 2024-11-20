import yoga from "./yoga.wasm" with { type: "file" };
import { file } from "bun";

import initYoga from './index.js';
export { ALIGN_AUTO, ALIGN_BASELINE, ALIGN_CENTER, ALIGN_FLEX_END, ALIGN_FLEX_START, ALIGN_SPACE_AROUND, ALIGN_SPACE_BETWEEN, ALIGN_STRETCH, DIMENSION_HEIGHT, DIMENSION_WIDTH, DIRECTION_INHERIT, DIRECTION_LTR, DIRECTION_RTL, DISPLAY_FLEX, DISPLAY_NONE, EDGE_ALL, EDGE_BOTTOM, EDGE_END, EDGE_HORIZONTAL, EDGE_LEFT, EDGE_RIGHT, EDGE_START, EDGE_TOP, EDGE_VERTICAL, EXPERIMENTAL_FEATURE_ABSOLUTE_PERCENTAGE_AGAINST_PADDING_EDGE, EXPERIMENTAL_FEATURE_FIX_ABSOLUTE_TRAILING_COLUMN_MARGIN, EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS, FLEX_DIRECTION_COLUMN, FLEX_DIRECTION_COLUMN_REVERSE, FLEX_DIRECTION_ROW, FLEX_DIRECTION_ROW_REVERSE, GUTTER_ALL, GUTTER_COLUMN, GUTTER_ROW, JUSTIFY_CENTER, JUSTIFY_FLEX_END, JUSTIFY_FLEX_START, JUSTIFY_SPACE_AROUND, JUSTIFY_SPACE_BETWEEN, JUSTIFY_SPACE_EVENLY, LOG_LEVEL_DEBUG, LOG_LEVEL_ERROR, LOG_LEVEL_FATAL, LOG_LEVEL_INFO, LOG_LEVEL_VERBOSE, LOG_LEVEL_WARN, MEASURE_MODE_AT_MOST, MEASURE_MODE_EXACTLY, MEASURE_MODE_UNDEFINED, NODE_TYPE_DEFAULT, NODE_TYPE_TEXT, OVERFLOW_HIDDEN, OVERFLOW_SCROLL, OVERFLOW_VISIBLE, POSITION_TYPE_ABSOLUTE, POSITION_TYPE_RELATIVE, POSITION_TYPE_STATIC, PRINT_OPTIONS_CHILDREN, PRINT_OPTIONS_LAYOUT, PRINT_OPTIONS_STYLE, UNIT_AUTO, UNIT_PERCENT, UNIT_POINT, UNIT_UNDEFINED, WRAP_NO_WRAP, WRAP_WRAP, WRAP_WRAP_REVERSE } from './index.js';

const Yoga = await initYoga(
  await file(yoga).arrayBuffer()
);

export { Yoga as default };
