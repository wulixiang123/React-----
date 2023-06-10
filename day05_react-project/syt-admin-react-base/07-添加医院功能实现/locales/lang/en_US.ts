import { getFilesContent } from "../helper";

const langs = require.context("./en_US", true, /\.ts$/);

// 汇总对应文件夹下所有文件，默认暴露出去
export default getFilesContent(langs);
