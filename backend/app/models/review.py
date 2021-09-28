from enum import Enum as PyEnum

from sqlalchemy import Column, DateTime, Integer, String, Enum
from sqlalchemy.sql import func

from app.services.db.sql_connection import Base, get_db


class ReviewCategory(PyEnum):
    SAHA = 'saha'
    SCIENCE = 'science'
    SOCIAL = 'social'
    HUMAN = 'human'


class Review(Base):

    __tablename__ = "reviews"
    __table_args__ = {'extend_existing': True,}

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String)
    category = Column(Enum(ReviewCategory))
    author = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

# get_db().add_all([
#         Review(id=1, subject="WINE EDUCATION",
#                              body="This is very good",
#                              category='saha',
#                              author='Superman',
#                              created_at='05-01-2021'),
#         Review(id=2, subject="WASTE MANAGEMENT",
#                              body="This is very good",
#                              category='saha',
#                              author='Jame',
#                              created_at='14-02-2021'),
#         Review(id=3, subject="PROF COMM SKL INNO",
#                              body="This is very good",
#                              category='saha',
#                              author='John',
#                              created_at='13-04-2021'),
#         Review(id=4,
#                              subject="DRUG DAILY LIFE",
#                              body="This is very good",
#                              category='science',
#                              author='Knot',
#                              created_at='12-08-2021'),
#         Review(id=5, subject="PHYS BIO SYS",
#                              body="This is very good",
#                              category='science',
#                              author='Job',
#                              created_at='05-12-2021'),
#         Review(id=6, subject="NATURAL SCIENCE",
#                              body="This is very good",
#                              category='science',
#                              author='Heart',
#                              created_at='13-11-2021'),
#         Review(id=7, subject="FOUNDATION ECON",
#                              body="Great markq kaa very good.",
#                              category='social',
#                              author='Book',
#                              created_at='08-11-2021'),
#         Review(id=8, subject="PRIN MKTG",
#                              body="This is very hard, go away.",
#                              category='social',
#                              author='Up',
#                              created_at='05-04-2020'),
#         Review(id=9, subject="INTRO TO LAW",
#                              body="If you are doing great at this, you are books.",
#                              category='social',
#                              author='Tar',
#                              created_at='19-03-2021'),
#         Review(id=10, subject="PHILOS LOGIC",
#                              body="This is awards to our universe.",
#                              category='human',
#                              author='Superman',
#                              created_at='03-12-2021'),
#         Review(id=11, subject="BUDDHIST TEACHING",
#                              body="Believe me, this is the best.",
#                              category='human',
#                              author='Superman',
#                              created_at='21-07-2021'),
#         Review(id=12, subject="JAPAN TODAY",
#                              body="Konichiwa itai des.",
#                              category='human',
#                              author='Superman',
#                              created_at='31-05-2021'),
# ])
