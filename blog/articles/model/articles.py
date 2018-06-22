from extensions import db


class Article(db.Model):
    """博客文章"""
    __tablename__ = "d_articles"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(50), nullable=False)  # 文章标题
    summary = db.Column(db.String(200))  # 文章概要
    content = db.Column(db.Text, nullable=False)  # 文章内容
    click_count = db.Column(db.Integer, default=0)  # 文章点击率
    is_recommend = db.Column(db.Boolean, default=False)  # 是否推荐
    publish_time = db.Column(db.DateTime, nullable=False)  # 发布时间
    publish_ip = db.Column(db.String(30))  # 发布IP

    user_id = db.Column(db.Integer, db.ForeignKey("d_users.id"))  # 发布者ID
    user = db.relationship("User", lazy="dynamic")

    category_id = db.Column(db.Integer, db.ForeignKey("d_categorys.id"))  # 文章类别
    category = db.relationship("Category", backref="articles", lazy="dynamic")

    comments = db.relationship("Comment")  # 评论集合


class Category(db.Model):
    """文章分类"""
    __tablename__ = "d_categorys"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(15), nullable=False)  # 类别名称
    seq = db.Column(db.Integer, default=0)  # 排序序号
    parent_id = db.Column(db.Integer, db.ForeignKey("d_categorys.id"))  # 父类别ID
    parent = db.relationship("Category")


class Tag(db.Model):
    """文章标签"""
    __tablename__ = "d_tags"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20), nullable=False, unique=True)  # 标签名称


# 文章和标签中间表关系
article_tag_ship = db.Table("d_article_tag_ship",
                            db.Column("article_id", db.Integer, db.ForeignKey("d_articles.id"), primary_key=True),
                            db.Column("d_tags", db.Integer, db.ForeignKey("d_tags.id"), primary_key=True))


class Comment(db.Model):
    """文章评论"""
    __tablename__ = "d_comments"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.Text, nullable=False)  # 评论内容
    publish_time = db.Column(db.DateTime, nullable=False)  # 发布时间
    publish_ip = db.Column(db.String(30))  # 发布IP

    user_id = db.Column(db.Integer, db.ForeignKey("d_users.id"))  # 发布者ID
    user = db.relationship("User", lazy="dynamic")

    article_id = db.Column(db.Integer, db.ForeignKey("d_articles.id"))  # 文章ID

    parent_id = db.Column(db.Integer, db.ForeignKey("d_comments.id"))  # 引用评论父ID
    parent = db.relationship("Comment")

    is_show = db.Column(db.Boolean, default=False)  # 评论是否显示
