/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 *  or in the "license" file accompanying this file. This file is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *  express or implied. See the License for the specific language governing
 *  permissions and limitations under the License.
 */

const _ = require('lodash');
const Resource = require('../base/resource');
const { putTestTxtFileInS3, deleteTestTxtFileInS3 } = require('../../complex/egress-store-setup');

class DataEgress extends Resource {
  constructor({ clientSession, id, parent }) {
    super({
      clientSession,
      type: 'dataEgress',
      id,
      parent,
    });

    if (_.isEmpty(parent)) throw Error('A parent resource was not provided to resource type [dataEgress]');
  }

  // ************************ Helpers methods ************************
  async putTestTxtFileInS3(bucketName, environmentId) {
    return putTestTxtFileInS3({ aws: this.setup.aws, bucketName, environmentId });
  }

  async deleteTestTxtFileInS3(bucketName, environmentId) {
    await deleteTestTxtFileInS3({ aws: this.setup.aws, bucketName, environmentId });
  }
}

module.exports = DataEgress;
