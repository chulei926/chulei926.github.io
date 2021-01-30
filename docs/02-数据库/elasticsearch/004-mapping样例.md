# 试题 tk-paper

```json
{
    "tk_paper_test": {
        "mappings": {
            "properties": {
                "create": {
                    "properties": {
                        "time": {
                            "type": "date",
                            "format": "yyyy-MM-dd HH:mm:ss"
                        },
                        "user": {
                            "type": "keyword"
                        }
                    }
                },
                "difficulty": {
                    "type": "integer"
                },
                "eduSys": {
                    "type": "integer"
                },
                "grade": {
                    "type": "keyword"
                },
                "isPublic": {
                    "type": "integer"
                },
                "name": {
                    "type": "text",
                    "analyzer": "ik_smart"
                },
                "objectId": {
                    "type": "keyword"
                },
                "phase": {
                    "type": "keyword"
                },
                "quality": {
                    "type": "integer"
                },
                "question": {
                    "properties": {
                        "score": {
                            "type": "double"
                        },
                        "uuid": {
                            "type": "keyword"
                        }
                    }
                },
                "sharingRecord": {
                    "properties": {
                        "school": {
                            "type": "keyword"
                        },
                        "sharer": {
                            "type": "keyword"
                        },
                        "stype": {
                            "type": "integer"
                        },
                        "time": {
                            "type": "date",
                            "format": "yyyy-MM-dd HH:mm:ss"
                        }
                    }
                },
                "source": {
                    "type": "integer"
                },
                "status": {
                    "type": "integer"
                },
                "subject": {
                    "type": "keyword"
                },
                "update": {
                    "properties": {
                        "time": {
                            "type": "date",
                            "format": "yyyy-MM-dd HH:mm:ss"
                        },
                        "user": {
                            "type": "keyword"
                        }
                    }
                },
                "useAttr": {
                    "properties": {
                        "ptype": {
                            "type": "integer"
                        },
                        "region": {
                            "type": "keyword"
                        },
                        "type": {
                            "type": "long"
                        },
                        "typeName": {
                            "type": "keyword"
                        },
                        "year": {
                            "type": "integer"
                        }
                    }
                },
                "uuid": {
                    "type": "keyword"
                },
                "verifyStatus": {
                    "type": "integer"
                },
                "version": {
                    "type": "integer"
                }
            }
        }
    }
}

```

# 试题 tk-question

```json
{
    "tk_question_test": {
        "mappings": {
            "properties": {
                "create": {
                    "properties": {
                        "time": {
                            "type": "date",
                            "format": "yyyy-MM-dd HH:mm:ss"
                        },
                        "user": {
                            "type": "keyword"
                        }
                    }
                },
                "difficulty": {
                    "type": "integer"
                },
                "difficultyName": {
                    "type": "keyword"
                },
                "eduSys": {
                    "type": "integer"
                },
                "examPoint": {
                    "type": "keyword"
                },
                "grade": {
                    "type": "keyword"
                },
                "isPublic": {
                    "type": "integer"
                },
                "knowledge": {
                    "type": "keyword"
                },
                "knowledgeLevels": {
                    "properties": {
                        "code": {
                            "type": "keyword"
                        },
                        "leaf": {
                            "type": "boolean"
                        },
                        "level": {
                            "type": "integer"
                        },
                        "linkType": {
                            "type": "keyword"
                        },
                        "name": {
                            "type": "keyword"
                        }
                    }
                },
                "objectId": {
                    "type": "keyword"
                },
                "paper": {
                    "type": "keyword"
                },
                "phase": {
                    "type": "keyword"
                },
                "quality": {
                    "type": "integer"
                },
                "score": {
                    "type": "double"
                },
                "sharingRecord": {
                    "properties": {
                        "school": {
                            "type": "keyword"
                        },
                        "sharer": {
                            "type": "keyword"
                        },
                        "time": {
                            "type": "date",
                            "format": "yyyy-MM-dd HH:mm:ss"
                        },
                        "type": {
                            "type": "integer"
                        }
                    }
                },
                "show": {
                    "type": "integer"
                },
                "similarQuestion": {
                    "properties": {
                        "difficulty": {
                            "type": "integer"
                        },
                        "similarity": {
                            "type": "double"
                        },
                        "uuid": {
                            "type": "keyword"
                        }
                    }
                },
                "source": {
                    "type": "integer"
                },
                "statistics": {
                    "properties": {
                        "answerCount": {
                            "type": "integer"
                        },
                        "avgScoreRate": {
                            "type": "double"
                        },
                        "usageCount": {
                            "type": "integer"
                        },
                        "viewCount": {
                            "type": "integer"
                        }
                    }
                },
                "status": {
                    "type": "integer"
                },
                "structure": {
                    "properties": {
                        "analysis": {
                            "properties": {
                                "content": {
                                    "type": "text",
                                    "analyzer": "ik_smart"
                                },
                                "index": {
                                    "type": "integer"
                                }
                            }
                        },
                        "answer": {
                            "properties": {
                                "content": {
                                    "type": "text",
                                    "analyzer": "ik_smart"
                                },
                                "index": {
                                    "type": "integer"
                                }
                            }
                        },
                        "content": {
                            "type": "text",
                            "analyzer": "ik_smart"
                        },
                        "material": {
                            "properties": {
                                "content": {
                                    "type": "text",
                                    "analyzer": "ik_smart"
                                },
                                "index": {
                                    "type": "integer"
                                }
                            }
                        },
                        "option": {
                            "properties": {
                                "content": {
                                    "type": "text",
                                    "analyzer": "ik_smart"
                                },
                                "index": {
                                    "type": "keyword"
                                }
                            }
                        },
                        "subQuestion": {
                            "properties": {
                                "analysis": {
                                    "properties": {
                                        "content": {
                                            "type": "text",
                                            "analyzer": "ik_smart"
                                        },
                                        "index": {
                                            "type": "integer"
                                        }
                                    }
                                },
                                "answer": {
                                    "properties": {
                                        "content": {
                                            "type": "text",
                                            "analyzer": "ik_smart"
                                        },
                                        "index": {
                                            "type": "integer"
                                        }
                                    }
                                },
                                "content": {
                                    "type": "text",
                                    "analyzer": "ik_smart"
                                },
                                "index": {
                                    "type": "integer"
                                },
                                "knowledge": {
                                    "type": "keyword"
                                },
                                "materialIndex": {
                                    "type": "integer"
                                },
                                "option": {
                                    "properties": {
                                        "content": {
                                            "type": "text",
                                            "analyzer": "ik_smart"
                                        },
                                        "index": {
                                            "type": "keyword"
                                        }
                                    }
                                },
                                "score": {
                                    "type": "double"
                                },
                                "type": {
                                    "type": "keyword"
                                }
                            }
                        },
                        "txt": {
                            "type": "text",
                            "analyzer": "ik_smart"
                        }
                    }
                },
                "subject": {
                    "type": "keyword"
                },
                "type": {
                    "type": "keyword"
                },
                "typeName": {
                    "type": "keyword"
                },
                "update": {
                    "properties": {
                        "time": {
                            "type": "date",
                            "format": "yyyy-MM-dd HH:mm:ss"
                        },
                        "user": {
                            "type": "keyword"
                        }
                    }
                },
                "useAttr": {
                    "properties": {
                        "region": {
                            "type": "keyword"
                        },
                        "type": {
                            "type": "integer"
                        },
                        "year": {
                            "type": "integer"
                        }
                    }
                },
                "uuid": {
                    "type": "keyword"
                },
                "verifyStatus": {
                    "type": "integer"
                },
                "version": {
                    "type": "integer"
                }
            }
        }
    }
}

```

