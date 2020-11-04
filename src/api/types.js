import ajax from './ajax'

const Base = "http://172.16.13.73:8261"
export const LOGIN = (userName,password) => ajax(Base+"/login",{userName,password},'GET')                    //登录

export const REQDYNAMIC = (data) => ajax(Base+"/dynamic/query_dynamic.do",data,'POST')                             //动态查询数据源
export const REQONEDYNAMIC = (data,url) => ajax(Base+"/dynamic/query_dynamic_number.do"+url,data,'POST')           //动态查询语句，使用数据源编号
export const REQDATASOURCE = (url) => ajax(Base+"/dynamic/query_datasource.do"+url)                                      //动态数据源连接接口
export const REQDATASOURCELIST = () => ajax(Base+"/dynamic/query_list_datasource.do")                                    //查看数据源列表
export const REQAll = (url) => ajax(Base+"/dynamic/query_all.do"+url)                                                    //查看某个表中所有的字段
export const REQARRAYLIST = (url) => ajax(Base+"/dynamic/query_array_list.do"+url)                                       //数据测试

export const FIELDLIST = (url) => ajax(Base+"/field/list_field.do"+url)                                                  //列表生成查询
export const EXPORTFIELD = (url) => ajax(Base+"/field/export_excel.do"+url)                                              //列表生成查询

