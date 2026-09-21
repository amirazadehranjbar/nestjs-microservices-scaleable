import { Logger, NotFoundException } from '@nestjs/common';
import { Model, QueryFilter, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema.js';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: QueryFilter<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: QueryFilter<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, { new: true })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async find(filterQuery: QueryFilter<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findOneAndDelete(
    filterQuery: QueryFilter<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>(true);

    // WHY: .lean<TDocument>() types as TDocument | null since the document
    // may not exist — narrow it here instead of returning the union, and
    // stay consistent with findOne/findOneAndUpdate's not-found behavior
    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document;
  }
}
