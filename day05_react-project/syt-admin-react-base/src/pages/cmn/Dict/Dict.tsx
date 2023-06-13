import { getDistrictList } from '@/api/hospital/hospitalList'
import { IDistrictList } from '@/api/hospital/model/hospitalListTypes'
import { Card, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { RightOutlined, DownOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

export default function Dict() {
    const columns: ColumnsType<any> = [
        {
            title: '名称',
            dataIndex: 'name'
        },
        {
            title: '编码',
            dataIndex: 'dictCode'
        },
        {
            title: '值',
            dataIndex: 'value'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime'
        }
    ]
    // 定义状态
    let [dictList, setDictList] = useState<IDistrictList>([])
    const _getDict = async () => {
        let res = await getDistrictList(1);
        // console.log('res: ', res);
        setDictList(res);
    }
    useEffect(() => {
        _getDict();
    }, [])
    return (
        <Card>
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={dictList}
                pagination={false}
                expandable={{
                    expandIcon: ({ expanded, onExpand, record }) => {
                        if(!record.hasChildren){
                            return <div style={{display:'inline-block',width:15}}></div>
                        }

                        // console.log('expanded: ', expanded);// 展开还是收起的一个标识 boolean
                        // console.log('onExpand:' , onExpand);// 是展开节点的函数， 当当前行对象中有children属性的时候，就会将children数组中的内容，作为子节点展开
                        // console.log('record: ', record);// 当前行对象

                        return expanded ? (
                            <DownOutlined onClick={e => onExpand(record, e)} />
                        ) : (
                            <RightOutlined onClick={async e =>{
                                // 发送ajax请求，将获取到的子节点列表数据，添加到 record的 children属性上
                                if(!record.children?.length){
                                    let children = await getDistrictList(record.id)
                                    console.log({children});
                                    record.children = children
                                }
                                onExpand(record, e)
                            }} />
                        )
                    }

                }}
            />
        </Card>
    )
}
