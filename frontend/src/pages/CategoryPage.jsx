import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Tag
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined
} from "@ant-design/icons";
import axios from "axios";

const { confirm } = Modal;

export default function CategoryPage() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch Categories
  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    const data = res.data;

    const filtered = data.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    setCategories(filtered);
  };

  useEffect(() => {
    fetchCategories();
  }, [search]);

  // Save Category
  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (editingCategory) {
        await axios.put(
          `http://localhost:5000/api/categories/${editingCategory.id}`,
          values
        );
        message.success("Category updated!");
      } else {
        await axios.post("http://localhost:5000/api/categories", values);
        message.success("Category created!");
      }

      setOpen(false);
      setEditingCategory(null);
      form.resetFields();
      fetchCategories();
    } catch (error) {
      message.error("Error saving category");
    }
  };

  // Open Edit Modal
  const openEditModal = (category) => {
    setEditingCategory(category);
    setOpen(true);
    form.setFieldsValue(category);
  };

  // Delete
  const handleDelete = (id) => {
    confirm({
      title: "Are you sure?",
      content: "This action cannot be undone!",
      okText: "Yes, delete",
      okType: "danger",
      onOk: async () => {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        message.success("Category deleted!");
        fetchCategories();
      },
    });
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Color",
      dataIndex: "color",
      render: (color) => <Tag color={color}>{color}</Tag>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => openEditModal(record)} />
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <h2>Category List</h2>

        <Space>
          <Input
            placeholder="Search categories..."
            prefix={<SearchOutlined />}
            allowClear
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 230 }}
          />

          <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
            Add Category
          </Button>
        </Space>
      </div>

      <Table columns={columns} dataSource={categories} rowKey="id" bordered />

      {/* Modal */}
      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={open}
        onOk={handleSave}
        onCancel={() => {
          setOpen(false);
          setEditingCategory(null);
          form.resetFields();
        }}
        okText={editingCategory ? "Update" : "Save"}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Color" name="color" rules={[{ required: true }]}>
            <Input type="color" style={{ width: 80, padding: 0 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
